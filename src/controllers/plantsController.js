require('dotenv').config();
const Plants = require('../database/helpers/plants');

async function createPlant(req, res) {
    const { name, watering_frequency, first_watered_at } = req.body;
    if (!name || !watering_frequency || !first_watered_at) {
        return await res.status(400).json({ error: "Can't add plant. Some information are missing" });
    } else {
        try {
            const user_id = req.decoded.subject;
            const newPlant = await Plants.addPlant(req.body, user_id);
            return res.status(201).json({ plant_id: newPlant[0] });
        } catch (err) {
            return await res.status(404).json({ error: err.message });
        }
    }
}

async function getPlant(req, res) {
    try {
        const user_id = req.decoded.subject;
        const plant_id = req.params.id;
        const plant = await Plants.getPlantById(plant_id);
        if (plant.user_id == user_id) {
            return await res.status(200).json(plant);
        } else {
            return await res.status(400).json({ error: 'User has no permition to see this plant' });
        }
    } catch (err) {
        return await res.status(404).json({ error: 'Plant not found!' });
    }
}

async function getAllPlants(req, res) {
    try {
        const user_id = req.decoded.subject;
        const allPlants = await Plants.getPlantByUserId(user_id);
        return await res.status(200).json(allPlants);
    } catch (err) {
        return await res.status(404).json({ error: 'Plants not found!' });
    }
}

async function updatePlant(req, res) {
    try {
        const user_id = req.decoded.subject;
        const plant_id = req.params.id;
        const plant = await Plants.getPlantById(plant_id);
        if (plant.user_id === user_id) {
            const updatedPlant = await Plants.updatePlant(req.body, plant_id);
            if (updatedPlant === 1) {
                return await res.status(200).json({ message: 'Plant succesfully updated!' });
            } else {
                throw new Error("Plant wasn't successfully updated. Try again.");
            }
        } else {
            return await res.status(400).json({ error: 'User has no permition to update this plant' });
        }
    } catch (err) {
        return await res.status(404).json({ error: err.message });
    }
}

async function deletePlant(req, res) {
    try {
        const user_id = req.decoded.subject;
        const plant_id = req.params.id;
        const plant = await Plants.getPlantById(plant_id);
        if (plant.user_id === user_id) {
            await Plants.deletePlant(plant_id);
            return await res.status(200).json({ message: 'Plant deleted!' });
        } else {
            return await res.status(400).json({ error: 'User has no permition to delete this plant' });
        }
    } catch (err) {
        return await res.status(404).json({ error: 'Plant not found!' });
    }
}
module.exports = {
    createPlant,
    getPlant,
    getAllPlants,
    updatePlant,
    deletePlant
};
