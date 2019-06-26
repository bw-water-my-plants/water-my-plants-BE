function apiController(req, res) {
    res.status(200).send({ message: 'API OK' });
}

module.exports = apiController;
