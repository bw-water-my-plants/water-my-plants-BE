exports.up = function(knex, Promise) {
    return knex.schema.createTable('plants', table => {
        table.increments('table_id');
        table.string('plant_id');
        table.string('plant_type', 128).notNullable();
        table.string('user_id').notNullable();
        table.string('name', 128);
        table.string('img_id', 128).notNullable();
        table.timestamp('last_watered_at').notNullable();
        table.timestamp('next_watering_at').notNullable();
        table.integer('height', 128);
        table.integer('watering_frequency').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('plants');
};
