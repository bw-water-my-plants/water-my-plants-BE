exports.up = function(knex, Promise) {
    return knex.schema.createTable('plants', table => {
        table.increments('id');
        table.string('plant_id');
        table.string('plant_type_id');
        table.string('user_id').notNullable();
        table.string('name', 128).notNullable();
        table.integer('watering_frequency').notNullable();
        table.timestamp('last_watered_at').notNullable();
        table.string('height', 128);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('plants');
};
