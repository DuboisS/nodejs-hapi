'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.table('user', (table) => {
            table.string('username').notNull();
            table.string('password').notNull();
            table.string('mail').notNull();
        });
    },

    async down(knex) {
    }
};
