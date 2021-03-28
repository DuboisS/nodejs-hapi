"use strict";

const Joi = require("joi");

module.exports = {
    method: "post",
    path: "/user/movie",
    options: {
        tags: ["api"],
        auth : {
            scope: [ 'user' ]
        },
        validate: {
            payload: Joi.object({
                movieTitle: Joi.string().required().min(3).example("Spiderman").description("Title of the movie"),
            }),
        },
    },
    handler: async (request, h) => {
        const {userService} = request.services();

        return await userService.addMovie(request.auth.credentials.id, request.payload);
    },
};
