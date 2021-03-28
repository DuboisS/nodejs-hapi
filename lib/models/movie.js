'use strict';

const Joi = require('joi');
const { Model } = require('schwifty');

module.exports = class Movie extends Model {

    static get tableName() {
        return 'movie';
    }

    static get joiSchema() {
        return Joi.object({
            id: Joi.number().integer().greater(0),
            title: Joi.string().min(3).example('Spiderman').description('Title of the movie'),
            description: Joi.string().min(3).example('Lorem').description('Description of the movie'),
            releaseDate: Joi.date().description('Release date of the movie'),
            director: Joi.string().min(3).description('Director of the movie'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    $beforeInsert(queryContext) {
        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {
        this.updatedAt = new Date();
    }
};
