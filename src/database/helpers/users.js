const db = require('../dbConfig');

async function getUserByEmail(email) {
    return await db
        .select('*')
        .from('users')
        .where({ email })
        .first();
}

async function getUserByPhoneNumber(phone_number) {
    return await db
        .select('*')
        .from('users')
        .where({ phone_number })
        .first();
}

async function getUserById(user_id) {
    return await db
        .select('*')
        .from('users')
        .where({ user_id })
        .first();
}

async function insertUser(user, user_id) {
    return await db('users')
        .insert({ username: user.username, password: user.password, email: user.email, phone_number: user.phone_number, user_id: user_id })
        .then(response => {
            return {
                id: response[0]
            };
        });
}

async function updateUser(user_id, user) {
    return await db('users')
        .where({ user_id })
        .update({ username: user.username, password: user.password, email: user.email, phone_number: user.phone_number });
}

async function deleteUser(user_id) {
    return await db('users')
        .where({ user_id })
        .del();
}

async function getPhoneNumberFromUserId(user_id) {
    return await db('plants')
        .select('plants.plant_id', 'plants.name', 'plants.plant_type', 'users.username', 'users.phone_number')
        .leftJoin('users', 'plants.user_id', 'users.user_id')
        .where('plants.user_id', user_id);
}

module.exports = {
    getUserByEmail,
    getUserByPhoneNumber,
    getUserById,
    insertUser,
    updateUser,
    deleteUser,
    getPhoneNumberFromUserId
};
