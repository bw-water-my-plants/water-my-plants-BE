require('dotenv').config();
const Users = require('../database/helpers/users');

async function getUser(req, res) {
    try {
        const user_id = req.decoded.subject;
        const user = await Users.getUserById(user_id);
        return await res.status(200).json({
            user_id: user.user_id,
            username: user.username,
            email: user.email,
            phone_number: user.phone_number
        });
    } catch (err) {
        return await res.status(404).json({ error: 'User profile not found!' });
    }
}

async function updateUser(req, res) {
    try {
        let user_id = req.decoded.subject;
        const user = await Users.updateUser(user_id, req.body);
        if (user === 1) {
            return await res.status(200).json({ message: 'Succesfully changed' });
        } else {
            throw new Error("User wasn't successfully updated. Try again.");
        }
    } catch (err) {
        return await res.status(404).json({ error: 'Something went wrong. Make sure that user exists and right information were filled!' });
    }
}

async function deleteUser(req, res) {
    try {
        const user_id = req.decoded.subject;
        const user = await Users.deleteUser(user_id);
        if (user === 1) {
            return await res.status(200).json({ message: 'Succesfully deleted' });
        } else {
            throw new Error("User wasn't successfully deleted. Try again.");
        }
    } catch (err) {
        return await res.status(404).json({ error: 'User profile not found!' });
    }
}

module.exports = { getUser, updateUser, deleteUser };
