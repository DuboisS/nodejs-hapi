'use strict';

const Joi = require('joi');
const { Model } = require('schwifty');

module.exports = class User extends Model {

    static get tableName() {
        return 'user';
    }

    static get joiSchema() {
        return Joi.object({
            id: Joi.number().integer().greater(0),
            firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
            lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
            username: Joi.string().min(3).example('johndoe').description('Username of the user'),
            password: Joi.string().min(6).description('Password of the user'),
            mail: Joi.string().example('john@doe.com').description('Email of the user'),
            roles: Joi.string().description('Roles of the user'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    $beforeInsert(queryContext) {
        this.roles = JSON.stringify(["user"]);
        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {
        this.updatedAt = new Date();
    }

};
