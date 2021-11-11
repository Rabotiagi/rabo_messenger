const wrapper = require('../utils/wrapper.js');
const Conversations = require('../../database/models/conversations.js');
const Messages = require('../../database/models/messages.js');
const {or} = require('sequelize').Op;
const renderChats = require('../utils/chats.js');


const chatMessage = (io) => async (message, id, chat) => {
    io.emit('message', wrapper('user', message));

    const messageToPost = {
        fromConv: chat,
        msg: message,
        sender: id
    };

    await Messages.create(messageToPost);
};

const getChats = (socket) => async (id) => {
    const res = await Conversations.findAll({
        where:{
            [or]: [
                {firstUser: id},
                {secondUser: id}
            ]
        },
        include: [Messages]
    });

    const convs = await renderChats(res, id);

    console.log(convs);
    
    socket.emit('chats', convs)
};

const joinChat = (socket) => async (chat) => {
    socket.join(chat);
    const messages = [];

    const res = await Messages.findAll({
        where: {
            fromConv: chat
        }
    });

    res.map(msg => {
        messages.push({message: msg.msg, time: msg.createdAt});
    });

    socket.emit('history', messages);
};

module.exports = {
    chatMessage,
    joinChat,
    getChats
};