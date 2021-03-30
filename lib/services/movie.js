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
        const {User} = this.server.models();
        const {UserMovies} = this.server.models();

        const usersMovies = await UserMovies.query()
            .select('user_id')
            .where('movie_id', movie.id);

        let ids = [];
        usersMovies.forEach((i, index) => {
            ids[index] = i.user_id
         })

       const users = await User.query().findByIds(ids);

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
