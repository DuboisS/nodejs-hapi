"use strict";

const {Service} = require("schmervice");
const Encrypt = require("@duboiss/encrypt");
const Boom = require("@hapi/boom");
const Jwt = require('@hapi/jwt');
const SendMail = require("../mixin/mail");

module.exports = class UserService extends Service {
    create(user) {
        const {User} = this.server.models();

        user.password = Encrypt(user.password);

        var mail = {
            from: process.env.MAILER_FROM,
            to: user.mail,
            subject: "Welcome!",
            text: "Welcome to our website!",
        };
        SendMail(mail);

        return User.query().insertAndFetch(user);
    }

    list() {
        const {User} = this.server.models();

        return User.query();
    }

    async get(id) {
        const {User} = this.server.models();

        const userQuery = await User.query().findOne({
            id,
        });

        if (userQuery) {
            return userQuery;
        }

        return Boom.badData('Invalid user id.');
    }

    async delete(user) {
        const {User} = this.server.models();
        const {UserMovies} = this.server.models();

        const usersMovies = await UserMovies.query()
            .select('id')
            .where('user_id', user.id);

        let ids = [];
        usersMovies.forEach((i, index) => {
            ids[index] = i.id
        })

        await User.query().deleteById(user.id);

        return "";
    }

    async update(user) {
        const {User} = this.server.models();

        user.password = Encrypt(user.password);

        return User.query().updateAndFetchById(user.id, user);
    }

    async login(credentials) {
        const {User} = this.server.models();

        // Check user exists before updating it
        const passwordEncrypt = Encrypt(credentials.password);

        const user = await User.query().findOne({
            mail: credentials.mail,
            password: passwordEncrypt
        });

        if (user) {
            const token = Jwt.token.generate(
                {
                    aud: 'urn:audience:iut',
                    iss: 'urn:issuer:iut',
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.mail,
                    scope: JSON.parse(user.roles),
                },
                {
                    key: 'random_string', // La clé qui est définit dans lib/auth/strategies/jwt.js
                    algorithm: 'HS512'
                },
                {
                    ttlSec: 14400 // 4 hours
                }
            );

            return token;
        }

        return Boom.unauthorized('401 Unauthorized');
    }
};
