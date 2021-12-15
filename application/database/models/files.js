const Sequelize = require('sequelize');
const seq = require('../connection.js');

const Files = seq.define('files', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    fromMsg: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    path: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Files;