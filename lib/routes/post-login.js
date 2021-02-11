"use strict";

const Joi = require("joi");

module.exports = {
    method: "post",
    path: "/user/login",
    options: {
        tags: ["api"],
        validate: {
            payload: Joi.object({
                password: Joi.string()
                    .required()
                    .description("Password of the user"),
                mail: Joi.string()
                    .required()
                    .email()
                    .description("Email of the user"),
            }),
        },
    },
    handler: async (request, h) => {
        const { userService } = request.services();

        return await userService.login(request.payload);
    },
};
