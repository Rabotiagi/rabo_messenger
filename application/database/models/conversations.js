const Sequelize = require('sequelize');
const seq = require('../connection.js');
const Users = require('./users.js');

const Conversations = seq.define('conversations', {
    conv_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstUser: {
        type: Sequelize.INTEGER,
        references:{
            model: Users,
            key: 'id'
        }
    },
    secondUser: {
        type: Sequelize.INTEGER,
        references:{
            model: Users,
            key: 'id'
        }
    }
});

module.exports = Conversations;