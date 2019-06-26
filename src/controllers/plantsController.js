require('dotenv').config();
const uuid = require('uuid');
const Plants = require('../database/helpers/plants');

async function createPlant(req, res) {
    const { name, watering_frequency, last_watered_at } = req.body;
    if (!name || !watering_frequency || !last_watered_at) {
        return await res.status(400).json({ error: "Can't add plant. Some information are missing" });
    } else {
        try {
            const user_id = req.decoded.subject;
            const plant_id = uuid();
            const days = 60 * 60 * 24 * 1000 * watering_frequency;
            const watered_at = new Date(last_watered_at);
            const next_watering_at = new Date(watered_at.getTime() + days);
            const newPlant = await Plants.addPlant(req.body, plant_id, user_id, next_watering_at);
            if (req.body.height) {
                const plantHeight = await Plants.addToHeightHistory(plant_id, user_id, req.body.height);
            }
            const plantWatering = await Plants.addToWateringHistory(plant_id, user_id, req.body.last_watered_at);
            return res.status(201).json({ plant_id: plant_id });
        } catch (err) {
            return await res.status(404).json({ error: err.message });
        }
    }
}

async function getPlant(req, res) {
    try {
        const user_id = req.decoded.subject;
        const plant_id = req.params.plant_id;
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

async function getPlantHeight(req, res) {
    try {
        const user_id = req.decoded.subject;
        const plant_id = req.params.plant_id;
        const plant = await Plants.getHeightHistory(plant_id);
        if (plant[0].user_id == user_id) {
            return await res.status(200).json(plant);
        } else {
            return await res.status(400).json({ error: 'User has no permition to see this plant' });
        }
    } catch (err) {
        return await res.status(404).json({ error: 'Plant not found!' });
    }
}

async function getPlantWatering(req, res) {
    try {
        const user_id = req.decoded.subject;
        const plant_id = req.params.plant_id;
        const plant = await Plants.getWateringHistory(plant_id);
        if (plant[0].user_id == user_id) {
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
        const plant_id = req.params.plant_id;
        const plant = await Plants.getPlantById(plant_id);
        if (plant.user_id === user_id) {
            if (req.body.height !== undefined) {
                await Plants.addToHeightHistory(plant_id, user_id, req.body.height);
            }

            if (req.body.last_watered_at !== undefined) {
                await Plants.addToWateringHistory(plant_id, user_id, req.body.last_watered_at);
                const days = 60 * 60 * 24 * 1000 * plant.watering_frequency;
                const watered_at = new Date(req.body.last_watered_at);
                const next_watering_at = new Date(watered_at.getTime() + days);
                await Plants.updatePlantNextWatering(plant_id, next_watering_at);
            }

            if (req.body.watering_frequency !== undefined) {
                const days = 60 * 60 * 24 * 1000 * req.body.watering_frequency;
                const watered_at = new Date(req.body.last_watered_at || plant.last_watered_at);
                const next_watering_at = new Date(watered_at.getTime() + days);
                await Plants.updatePlantNextWatering(plant_id, next_watering_at);
            }

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
        const plant_id = req.params.plant_id;
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
    deletePlant,
    getPlantHeight,
    getPlantWatering
};
