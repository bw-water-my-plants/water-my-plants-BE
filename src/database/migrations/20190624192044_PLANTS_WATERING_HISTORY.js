exports.up = function(knex, Promise) {
    return knex.schema.createTable('plants_watering', table => {
        table.increments('id');
        table.string('plant_id');
        table.string('user_id');
        table.timestamp('last_watered_at');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('plants_watering');
};
