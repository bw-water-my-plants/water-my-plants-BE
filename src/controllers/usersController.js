require('dotenv').config();
const Users = require('../database/helpers/users');

async function getUser(req, res) {
    try {
        let id = req.decoded.subject;
        const user = await Users.getUserById(id);
        return await res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            phone_number: user.phone_number
        });
    } catch (err) {
        return await res.status(404).json({ message: 'User profile not found!' });
    }
}

module.exports = { getUser };
