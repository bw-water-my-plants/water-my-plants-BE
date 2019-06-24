require('dotenv').config();
const jwt = require('jsonwebtoken');

function generateToken(user) {
    const payload = {
        subject: user.id,
        email: user.email
    };

    const options = {
        expiresIn: '1d'
    };

    return jwt.sign(payload, process.env.SECRET_KEY, options);
}

module.exports = generateToken;
