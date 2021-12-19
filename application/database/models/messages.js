const Sequelize = require('sequelize');
const seq = require('../connection.js');
const Messages = seq.define('messages', {
    msgId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    chat: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    msg: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sender: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Messages;