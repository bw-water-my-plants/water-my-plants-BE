const db = require('../dbConfig');

async function addPlant(plant, plant_id, user_id) {
    return await db('plants').insert({ plant_type_id: plant.plant_type_id, name: plant.name, watering_frequency: plant.watering_frequency, last_watered_at: plant.last_watered_at, height: plant.height, user_id: user_id, plant_id: plant_id });
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
        .update({ plant_type_id: plant.plant_type_id, name: plant.name, watering_frequency: plant.watering_frequency, last_watered_at: plant.last_watered_at, height: plant.height });
}
async function deletePlant(plant_id) {
    return await db('plants')
        .where({ plant_id })
        .del();
}

async function addToWateringHistory(plant_id, user_id, last_watered_at) {
    return await db('plants_watering').insert({ plant_id: plant_id, user_id, last_watered_at });
}

async function addToHeightHistory(plant_id, user_id, height) {
    return await db('plants_height').insert({ plant_id, user_id, height });
}

async function getWateringHistory(plant_id) {
    return await db('plants_watering')
        .select('*')
        .where({ plant_id });
}

async function getHeightHistory(plant_id) {
    return await db('plants_height')
        .select('*')
        .where({ plant_id });
}

module.exports = {
    addPlant,
    getPlantById,
    getPlantByUserId,
    updatePlant,
    deletePlant,
    addToWateringHistory,
    addToHeightHistory,
    getWateringHistory,
    getHeightHistory
};
