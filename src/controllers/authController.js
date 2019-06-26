const Users = require('../database/helpers/users');
const bcrypt = require('bcryptjs');
const createToken = require('../middleware/generateTokenMiddleware');
const uuid = require('uuid');

async function loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return await res.status(404).json({ error: 'Missing credentails' });
    } else {
        try {
            let user = await Users.getUserByEmail(email);
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = await createToken(user);
                return await res.status(200).json({ token });
            } else {
                return await res.status(404).json({ error: 'Incorrect credentials' });
            }
        } catch (err) {
            return await res.status(500).json({ error: err });
        }
    }
}

async function registerUser(req, res) {
    let { email, password, username, phone_number } = req.body;
    if (!email || !password || !username || !phone_number) {
        return await res.status(400).json({ error: "Can't register user. Some information are missing" });
    } else {
        try {
            let hashedPassword = bcrypt.hashSync(password, 10);
            password = hashedPassword;
            const userWithThisEmail = await Users.getUserByEmail(email);
            const userWithThisPhoneNumber = await Users.getUserByPhoneNumber(phone_number);
            if (userWithThisEmail !== undefined) {
                throw new Error('Email already registered');
            } else if (userWithThisPhoneNumber !== undefined) {
                throw new Error('Phone number already registered');
            } else {
                const user_id = uuid();
                await Users.insertUser({ email, password, username, phone_number }, user_id);
                return res.status(201).json({ message: 'Successfully registered!' });
            }
        } catch (err) {
            return await res.status(500).json({ error: err.message });
        }
    }
}

module.exports = {
    loginUser,
    registerUser
};
