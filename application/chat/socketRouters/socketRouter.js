const {
    chatMessage, 
    joinChat,
    getChats
} = require('../socketServices/room.js');

const socketRouter = (io, socket) => {
    socket.on('chatMessage', chatMessage(io));

    socket.on('getChats', getChats);

    socket.on('joinChats', joinChat(socket));
};

module.exports = socketRouter;