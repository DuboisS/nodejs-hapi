'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('usermovies', (table) => {

            table.increments('id').primary();
            table.integer('user_id').unsigned();
            //table.foreign('user_id').references('user.id');
            table.integer('movie_id').unsigned();
            table.foreign('movie_id').references('movie.id');
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('usermovies');
    }
};
