exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments('table_id');
        table.string('user_id');
        table.string('username', 128).notNullable();
        table.string('password').notNullable();
        table
            .string('email', 128)
            .unique()
            .notNullable();
        table
            .string('phone_number', 128)
            .unique()
            .notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
