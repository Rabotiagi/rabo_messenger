const Files = require('../database/models/files.js');
const Users = require('../database/models/users.js');
const Chats = require('../database/models/chats.js');
const Messages = require('../database/models/messages.js');
const Photos = require('../database/models/photos.js');

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

    Users.hasOne(Photos, {
        foreignKey: 'userId',
        targetKey: 'id'
    });

    Photos.belongsTo(Users, {
        foreignKey: 'userId',
        targetKey: 'id'
    });
};

module.exports = associate;