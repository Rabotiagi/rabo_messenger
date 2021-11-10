const {
    chatMessage, 
    joinChat,
    getChats
} = require('../socketServices/room.js');

const socketRouter = (io, socket) => {
    socket.on('chatMessage', chatMessage(io));

    socket.on('getRooms', getChats);

    socket.on('joinRoom', joinChat(socket));
};

module.exports = socketRouter;