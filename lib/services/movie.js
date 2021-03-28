"use strict";

const {Service} = require("schmervice");
const SendMail = require("../mixin/mail");

module.exports = class MovieService extends Service {
    async create(movie) {
        const {Movie} = this.server.models();
        const {User} = this.server.models();

        const users = await User.query();

        for (let i = 0; i < users.length; i++) {
            var mail = {
                from: process.env.MAILER_FROM,
                to: users[i].mail,
                subject: "New movie !",
                text: `New movie ! ${movie.title}`,
            };
            SendMail(mail);
        }

        return Movie.query().insertAndFetch(movie);
    }

    async update(movie) {
        const {Movie} = this.server.models();

        const users = await User.query(); // Only take favorites

        for (let i = 0; i < users.length; i++) {
            var mail = {
                from: process.env.MAILER_FROM,
                to: users[i].mail,
                subject: "New m!",
                text: `Movie updated ! ${movie.title}`,
            };
            SendMail(mail);
        }

        return Movie.query().updateAndFetchById(movie.id, movie);
    }
};
