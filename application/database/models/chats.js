const Sequelize = require('sequelize');
const seq = require('../connection.js');

const Chats = seq.define('chats', {
    room_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    users: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastMsg: {
        type: Sequelize.STRING
    }
});

module.exports = Chats;