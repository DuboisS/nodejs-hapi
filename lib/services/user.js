"use strict";

const {Service} = require("schmervice");
const Encrypt = require("@duboiss/encrypt");
const Boom = require("@hapi/boom");
const Jwt = require('@hapi/jwt');

module.exports = class UserService extends Service {
    create(user) {
        const {User} = this.server.models();

        user.password = Encrypt(user.password);

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

        await User.query().deleteById(user.id);

        return "";
    }

    async update(user) {
        const {User} = this.server.models();

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
            console.log(user);

            const token = Jwt.token.generate(
                {
                    aud: 'urn:audience:iut',
                    iss: 'urn:issuer:iut',
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

            console.log(token);

            return token;
        }

        return Boom.unauthorized('401 Unauthorized');
    }
};
