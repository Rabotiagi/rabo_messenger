const wrapper = require('../utils/wrapper.js');
const Conversations = require('../../database/models/conversations.js');
const Messages = require('../../database/models/messages.js');
const {or} = require('sequelize').Op;
const Users = require('../../database/models/users.js');

const chatMessage = (io) => async (message, id, chat) => {
    io.emit('message', wrapper('user', message));

    await Messages.create({
        fromConv: chat,
        msg: message,
        sender: id
    });
};

const getChats = (socket) => async (id) => {
    const res = await Conversations.findAll({
        where:{
            [or]: [
                {firstUser: id},
                {secondUser: id}
            ]
        }
    });

    const convs = [];

    const conv = res[0];
    const partner = conv.dataValues.firstUser === id ?
        conv.dataValues.secondUser : conv.dataValues.firstUser;

    const user = await Users.findOne({
        attributes: ['firstName'],
        where: {
            id: partner
        }
    });

    console.log(partner);

    convs.push({name: user.dataValues.firstName, id: partner});

    console.dir(convs);
    socket.emit('chats', convs)
};

const joinChat = (socket) => async (chat, id) => {
    socket.join(chat);
    const foreignMsg = [];
    const nativeMsg = [];

    const res = await Messages.findAll({where: {
        fromConv: chat
    }});

    for(let msg of res){
        if(msg.dataValues.sender === id){
            nativeMsg.push([msg.dataValues.msg, msg.dataValues.createdAt]);
        }

        foreignMsg.push([msg.dataValues.msg, msg.dataValues.createdAt]);
    }

    socket.emit('history', {nativeMsg, foreignMsg});
};

module.exports = {
    chatMessage,
    joinChat,
    getChats
};