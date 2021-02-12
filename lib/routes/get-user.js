"use strict";

const Joi = require("joi");

module.exports = {
    method: "get",
    path: "/user/{id}",
    options: {
        tags: ["api"],
        auth : {
            scope: ['user']
        },
        validate: {
            params: Joi.object({
                id: Joi.number().integer().min(0).description("Id of the user"),
            }),
        },
    },
    handler: async (request, h) => {
        const {userService} = request.services();

        return await userService.get(request.params.id);
    },
};
