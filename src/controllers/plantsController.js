require('dotenv').config();
const Plants = require('../database/helpers/plants');

//getPlant
//updatePlant
//deletePlant
//createPlant
//getPlantofUser
async function createPlant(req, res) {
    const { plant_type_id, name, watering_frequency, first_watered_at, height } = req.body;
    try {
        const user_id = req.decoded.subject;
        const newPlant = await Plants.createPlant({ plant_type_id, name, watering_frequency, first_watered_at, height }, user_id);
        return res.status(201).json({ message: 'Plant successfully added!' });
    } catch (err) {
        return await res.status(404).json({ error: err });
    }
}

async function getPlant(req, res) {
    try {
        const plant_id = req.body.plant_id;
        const plant = await Plants.getPlantById(plant_id);
        return await res.status(200).json(plant);
    } catch (err) {
        return await res.status(404).json({ message: 'User profile not found!' });
    }
}

module.exports = {
    createPlant,
    getPlant
};
