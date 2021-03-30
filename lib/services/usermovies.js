"use strict";

const {Service} = require("schmervice");
const Boom = require("@hapi/boom");
const SendMail = require("../mixin/mail");

module.exports = class UsermoviesService extends Service {
    async addFavoriteMovie(userId, payload) {
        const {Movie} = this.server.models();
        const {UserMovies} = this.server.models();

        const movie = await Movie.query().findOne({
            title: payload.movieTitle
        });

        if (!movie) {
            return Boom.badRequest('Movie not found');
        }

        const favorite = {
            user_id: userId,
            movie_id: movie.id
        }

        const userMovie = await UserMovies.query().findOne(favorite);

        if (userMovie) {
            return Boom.badRequest('Movie already in your favorites');
        }

        return UserMovies.query().insertAndFetch(favorite);
    }

    async removeFavoriteMovie(userId, payload) {
        const {Movie} = this.server.models();
        const {UserMovies} = this.server.models();

        const movie = await Movie.query().findOne({
            title: payload.movieTitle
        });

        if (!movie) {
            return Boom.badRequest('Movie not found');
        }

        const favorite = {
            user_id: userId,
            movie_id: movie.id
        }

        const userMovie = await UserMovies.query().findOne(favorite);

        if (!userMovie) {
            return Boom.badRequest('Movie not in your favorites');
        }

        return UserMovies.query().deleteById(userMovie.id);
    }
};
