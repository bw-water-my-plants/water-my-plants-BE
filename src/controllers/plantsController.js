require('dotenv').config();
const Plants = require('../database/helpers/plants');

async function createPlant(req, res) {
    try {
        let user_id = req.decoded.subject;
        let newPlant = await Plants.addPlant(req.body, user_id);
        return res.status(201).json({ plant_id: newPlant[0] });
    } catch (err) {
        return await res.status(404).json({ error: err });
    }
}

async function getPlant(req, res) {
    try {
        const plant_id = req.params.id;
        const plant = await Plants.getPlantById(plant_id);
        return await res.status(200).json(plant);
    } catch (err) {
        return await res.status(404).json({ message: 'Plant not found!' });
    }
}

async function getAllPlants(req, res) {
    try {
        let user_id = req.decoded.subject;
        const allPlants = await Plants.getPlantByUserId(user_id);
        return await res.status(200).json(allPlants);
    } catch (err) {
        return await res.status(404).json({ message: 'Plants not found!' });
    }
}

async function updatePlant(req, res) {
    try {
        const plant_id = req.params.id;
        const plant = await Plants.updatePlant(req.body, plant_id);
        return await res.status(200).json(plant);
    } catch (err) {
        return await res.status(404).json({ message: 'Plant not found!' });
    }
}

async function deletePlant(req, res) {
    try {
        const plant_id = req.params.id;
        await Plants.deletePlant(plant_id);
        return await res.status(200).json({ message: 'Plant deleted!' });
    } catch (err) {
        return await res.status(404).json({ message: 'Plant not found!' });
    }
}
module.exports = {
    createPlant,
    getPlant,
    getAllPlants,
    updatePlant,
    deletePlant
};
