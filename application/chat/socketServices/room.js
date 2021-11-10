const wrapper = require('../utils/wrapper.js');
const Chats = require('../../database/models/chats.js');

const chatMessage = (io) => (message) => {
    io.emit('message', wrapper('user', message));
};

const getRooms = async () => {
    const members = await Chats.findAll({attributes: ['firstName']});

    return members;
};

const joinRoom = (socket, room) => {
    //socket.join(room);
};

module.exports = {
    chatMessage, 
    joinRoom,
    getRooms
};