exports.up = function(knex, Promise) {
    return knex.schema.createTable('plants_height', table => {
        table.increments('table_id');
        table.string('plant_id');
        table.string('user_id');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.string('height', 128);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('plants_height');
};
