"use strict";

const Joi = require("joi");

module.exports = {
  method: "delete",
  path: "/user/delete",
  options: {
    tags: ["api"],
    validate: {
      payload: Joi.object({
        id: Joi.number().integer().min(0).description("Id of the user"),
      }),
    },
  },
  handler: async (request, h) => {
    const { userService } = request.services();

    return await userService.delete(request.payload);
  },
};
