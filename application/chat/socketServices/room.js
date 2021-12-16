const wrapper = require('../utils/wrapper.js');
const renderChats = require('../utils/chats.js');
const UsersRepo = require('./../../database/repository/usersRepo.js');
const ChatRepo = require('./../../database/repository/chatRepo.js');
const MessagesRepo = require('./../../database/repository/msgRepo.js');
const chatRepo = require('./../../database/repository/chatRepo.js');

const createChat = (socket) => async (users) => {
    try{
        await ChatRepo.createChat({users});
        const chat = await chatRepo.getConversation(users);
        socket.emit('newChat', chat.chat_id);
    } catch(e){
        console.log(e);
    }
};

const chatMessage = (io) => async (message, id, chat) => {
    const {firstName} = await UsersRepo.getUser({id});

    io.to(chat).emit('message', wrapper(firstName, message));

    const messageToPost = {
        fromConv: chat,
        msg: message,
        sender: id
    };

    await MessagesRepo.createMessage(messageToPost);
};

const getChats = (socket) => async (id) => {
    const res = await ChatRepo.getChats(id);
    const convs = await renderChats(res, id);
    socket.emit('chats', convs);
};

const joinChat = (socket) => async (chat) => {
    socket.join(chat);
    const messages = [];

    if(chat){
        const res = await MessagesRepo.getMessages(chat);

        res.map(msg => {
            messages.push({
                message: msg.msg, 
                time: msg.createdAt,
                firstName: msg.user.firstName
            });
        });
    }

    console.log(messages);

    socket.emit('history', messages);
};

module.exports = {
    chatMessage,
    joinChat,
    getChats,
    createChat
};