const Sequelize = require('sequelize');

const seq = new Sequelize('homework', 'hw_user', '27778336', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = seq;
