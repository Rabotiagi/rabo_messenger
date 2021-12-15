const Files = require('../database/models/files.js');
const Users = require('../database/models/users.js');
const Chats = require('../database/models/chats.js');
const Messages = require('../database/models/messages.js');

const associate = () => {
    Chats.hasMany(Messages, {
        foreignKey: 'fromConv',
        sourceKey: 'chat_id'
    });
    
    Messages.belongsTo(Chats, {
        foreignKey: 'fromConv',
        targetKey: 'chat_id'
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
        sourceKey: 'msg_id'
    });
    
    Files.belongsTo(Messages, {
        foreignKey: 'fromMsg',
        targetKey: 'msg_id'
    });
};

module.exports = associate;