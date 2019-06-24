const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

module.exports = server => {
    server.use(express.json());
    server.use(express.urlencoded());
    server.use(helmet());
    server.use(cors());
};
