exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments('user_id');
        table.string('name', 128).notNullable();
        table.string('email', 128).notNullable();
        table.string('phone_number', 128).notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
