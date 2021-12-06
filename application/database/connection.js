require('dotenv').config();

const Sequelize = require('sequelize');

const seq = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'postgres',
    host: 'localhost'
});

module.exports = seq;