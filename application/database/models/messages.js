const Sequelize = require('sequelize');
const seq = require('../connection.js');
const Conversations = require('./conversations.js');
const Users = require('./users.js');

const Messages = seq.define('messages', {
    msg_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    fromConv: {
        type: Sequelize.INTEGER,
        references: {
            model: Conversations,
            key: 'conv_id'
        }
    },
    msg: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sender: {
        type: Sequelize.INTEGER,
        references:{
            model: Users,
            key: 'id'
        }
    }
});



module.exports = Messages;