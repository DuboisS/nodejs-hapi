'use strict';

const Joi = require('joi');
const { Model } = require('schwifty');

module.exports = class UserMovies extends Model {

    static get tableName() {
        return 'usermovies';
    }

    static get joiSchema() {
        return Joi.object({
            id: Joi.number().integer().greater(0),
            user_id: Joi.number().integer().greater(0),
            movie_id: Joi.number().integer().greater(0)
        });
    }
};
