const {
    chatMessage, 
    joinRoom,
    getRooms
} = require('../socketServices/room.js');

const socketRouter = (io, socket) => {
    socket.on('chatMessage', chatMessage(io));

    socket.on('getRooms', getRooms);
};

module.exports = socketRouter;