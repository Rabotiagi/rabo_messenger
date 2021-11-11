const Sequelize = require('sequelize');
const seq = require('../connection.js');

const Conversations = seq.define('conversations', {
    conv_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstUser: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    secondUser: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Conversations;