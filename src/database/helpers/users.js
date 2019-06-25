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

async function getUserById(id) {
    return await db
        .select('*')
        .from('users')
        .where({ id })
        .first();
}

async function insertUser(user) {
    return await db('users')
        .insert({ username: user.username, password: user.password, email: user.email, phone_number: user.phone_number })
        .then(response => {
            return {
                id: response[0]
            };
        });
}

async function updateUser(id, user) {
    return await db('users')
        .where({ id })
        .update({ username: user.username, password: user.password, email: user.email, phone_number: user.phone_number });
}

async function deleteUser(id) {
    return await db('users')
        .where({ id })
        .del();
}

module.exports = {
    getUserByEmail,
    getUserByPhoneNumber,
    getUserById,
    insertUser,
    updateUser,
    deleteUser
};
