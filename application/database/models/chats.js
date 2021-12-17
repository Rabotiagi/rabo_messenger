const Sequelize = require('sequelize');
const seq = require('../connection.js');

const Chats = seq.define('chats', {
    chat_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    users: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false
    },
    chatName: {
        type: Sequelize.STRING
    }
});

module.exports = Chats;