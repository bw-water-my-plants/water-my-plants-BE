exports.up = function(knex, Promise) {
    return knex.schema.createTable('plants', table => {
        table.increments('plant_id');
        table.integer('plant_type_id');
        table.integer('user_id');
        table.string('name', 128).notNullable();
        table.integer('watering_frequency', 128);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('plants');
};
