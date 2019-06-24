require('dotenv').config();
const jwt = require('jsonwebtoken');

function decodeToken(req, res, next) {
    const token = req.get('Authorization');
    if (token) {
        return jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: err });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({ error: 'No token provided!' });
    }
}

module.exports = decodeToken;
