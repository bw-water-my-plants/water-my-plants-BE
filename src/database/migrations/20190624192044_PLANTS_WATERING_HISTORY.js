exports.up = function(knex, Promise) {
    return knex.schema.createTable('plants_watering', table => {
        table.increments('watering_id');
        table.integer('plant_id');
        table.integer('user_id');
        table.timestamp('last_watered_at');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('plants_watering');
};
