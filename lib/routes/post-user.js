"use strict";

const Joi = require("joi");

module.exports = {
    method: "post",
    path: "/user",
    options: {
        tags: ["api"],
        validate: {
            payload: Joi.object({
                firstName: Joi.string()
                    .required()
                    .min(3)
                    .example("John")
                    .description("Firstname of the user"),
                lastName: Joi.string()
                    .required()
                    .min(3)
                    .example("Doe")
                    .description("Lastname of the user"),
                username: Joi.string()
                    .required()
                    .min(3)
                    .example("johndoe")
                    .description("Username of the user"),
                password: Joi.string()
                    .required()
                    .min(6)
                    .example("Minimum 8 chars")
                    .description("Password of the user"),
                mail: Joi.string()
                    .required()
                    .email()
                    .example("john@doe.com")
                    .description("Email of the user"),
            }),
        },
    },
    handler: async (request, h) => {
        const {userService} = request.services();

        return await userService.create(request.payload);
    },
};
