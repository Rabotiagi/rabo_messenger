const {
    chatMessage, 
    joinChat,
    getChats,
    createChat,
    deleteChat
} = require('../socketServices/chats.js');

const {
    getUserPhoto,
    getFile
} = require('../socketServices/files.js');

const {findUsers} = require('../socketServices/users.js');

function socketRouter(socket) {
    socket.on('chatMessage', chatMessage);

    socket.on('getChats', getChats);

    socket.on('joinChats', joinChat);

    socket.on('createChat', createChat);

    socket.on('findUsers', findUsers);

    socket.on('deleteChat', deleteChat);

    socket.on('setUserId', (id) => {socket.userId = id});

    socket.on('getFile', getFile);

    socket.on('getUserPhoto', getUserPhoto);
}

module.exports = socketRouter;