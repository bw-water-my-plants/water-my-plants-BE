const db = require('../dbConfig');

async function addPlant(plant, user_id) {
    return await db('plants').insert({ plant_type_id: plant.plant_type_id, name: plant.name, watering_frequency: plant.watering_frequency, first_watered_at: plant.first_watered_at, height: plant.height, user_id: user_id });
}

async function getPlantById(plant_id) {
    return await db('plants')
        .select('*')
        .where({ plant_id })
        .first();
}

async function getPlantByUserId(user_id) {
    return await db('plants')
        .select('*')
        .where({ user_id });
}

async function updatePlant(plant, plant_id) {
    return await db('plants')
        .where({ plant_id })
        .update({ plant_type_id: plant.plant_type_id, name: plant.name, watering_frequency: plant.watering_frequency, first_watered_at: plant.first_watered_at, height: plant.height });
}
async function deletePlant(plant_id) {
    return await db('plants')
        .where({ plant_id })
        .del();
}

module.exports = {
    addPlant,
    getPlantById,
    getPlantByUserId,
    updatePlant,
    deletePlant
};
