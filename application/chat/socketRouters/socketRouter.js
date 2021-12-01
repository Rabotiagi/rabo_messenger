const {
    chatMessage, 
    joinChat,
    getChats,
    createChat
} = require('../socketServices/room.js');

const socketRouter = (io, socket) => {
    socket.on('chatMessage', chatMessage(io));

    socket.on('getChats', getChats(socket));

    socket.on('joinChats', joinChat(socket));

    socket.on('createChat', createChat(socket));
};

module.exports = socketRouter;