require('dotenv').config();
const jwt = require('jsonwebtoken');

function generateToken(user) {
    const payload = {
        subject: user.user_id,
        email: user.email
    };

    const options = {
        expiresIn: '3d'
    };

    return jwt.sign(payload, process.env.SECRET_KEY, options);
}

module.exports = generateToken;
