require('dotenv').config();
const knex = require('knex');
const knexConfig = require('../../knexfile');

const ENV = process.env.ENV || 'development';
const dbConfig = knex(knexConfig[ENV]);

module.exports = dbConfig;
