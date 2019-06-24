exports.up = function(knex, Promise) {
    return knex.schema.createTable('plants_watering', table => {
        table.increments('plant_id');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.boolean('watered');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('plants_watering');
};
