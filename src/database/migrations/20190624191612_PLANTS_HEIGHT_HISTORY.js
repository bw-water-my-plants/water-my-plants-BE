exports.up = function(knex, Promise) {
    return knex.schema.createTable('plants_height', table => {
        table.increments('height_id');
        table.integer('plant_id');
        table.integer('user_id');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.integer('height', 128);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('plants_height');
};
