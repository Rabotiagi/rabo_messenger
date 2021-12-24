const {
    chatMessage, 
    joinChat,
    getChats,
    createChat,
    deleteChat
} = require('../socketServices/room.js');

const {
    findUsers
} = require('../socketServices/users.js');

const socketRouter = (io, socket) => {
    socket.on('chatMessage', chatMessage(io));

    socket.on('getChats', getChats(socket));

    socket.on('joinChats', joinChat(socket));

    socket.on('createChat', createChat(socket));

    socket.on('findUsers', findUsers(socket));

    socket.on('deleteChat', deleteChat);
};

module.exports = socketRouter;