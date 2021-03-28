"use strict";

const Joi = require("joi");

module.exports = {
    method: "patch",
    path: "/movie/patch",
    options: {
        tags: ["api"],
        auth : {
            scope: [ 'admin' ]
        },
        validate: {
            payload: Joi.object({
                id: Joi.number().integer().min(0).description("Id of the movie"),
                title: Joi.string().required().min(3).example("Spiderman").description("Title of the movie"),
                description: Joi.string().required().min(3).description('Description of the movie'),
                releaseDate: Joi.date().required().description('Release date of the movie'),
                director: Joi.string().required().min(3).description('Director of the movie'),
            }),
        },
    },
    handler: async (request, h) => {
        const {movieService} = request.services();

        return await movieService.update(request.payload);
    },
};
