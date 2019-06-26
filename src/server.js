const express = require('express');
const serverMiddleware = require('./middleware/serverMiddleware');
const rootRoute = require('./controllers/rootController');
const router = require('./routes');
const server = express();

serverMiddleware(server);
server.get('/', rootRoute);
server.use('/api', router);

module.exports = server;
