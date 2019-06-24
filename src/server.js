const express = require('express');
const serverMiddleware = require('./middleware/serverMiddleware');
const rootRoute = require('./controllers/rootController');
const server = express();

serverMiddleware(server);
server.get('/', rootRoute);
module.exports = server;
