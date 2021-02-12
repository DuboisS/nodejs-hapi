'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.table('user', (table) => {
            table.json('roles').notNull();
        });
    },

    async down(knex) {
    }
};
