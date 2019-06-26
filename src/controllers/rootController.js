function rootRoute(req, res) {
    res.status(200).send('<h1>Water My Plants API</h1><p>Welcome to the API of Water My Plants app</p>');
}

module.exports = rootRoute;
