const Files = require('../database/models/files.js');
const Users = require('../database/models/users.js');
const Chats = require('../database/models/chats.js');
const Messages = require('../database/models/messages.js');

const associate = () => {
    Chats.hasMany(Messages, {
        foreignKey: 'chatId',
        sourceKey: 'chatId'
    });
    
    Messages.belongsTo(Chats, {
        foreignKey: 'chatId',
        targetKey: 'chatId'
    });
    
    Users.hasMany(Messages, {
        foreignKey: 'sender',
        sourceKey: 'id'
    });
    
    Messages.belongsTo(Users, {
        foreignKey: 'sender',
        targetKey: 'id'
    });
    
    Messages.hasOne(Files, {
        foreignKey: 'fromMsg',
        sourceKey: 'msgId'
    });
    
    Files.belongsTo(Messages, {
        foreignKey: 'fromMsg',
        targetKey: 'msgId'
    });
};

module.exports = associate;