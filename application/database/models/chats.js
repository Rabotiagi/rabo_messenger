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
    // firstUser: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false
    // },
    // secondUser: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false
    // }
});

module.exports = Chats;