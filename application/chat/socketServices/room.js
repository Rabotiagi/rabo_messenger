const wrapper = require('../utils/wrapper.js');
const renderChats = require('../utils/chats.js');
const UsersRepo = require('./../../database/repository/usersRepo.js');
const ChatRepo = require('./../../database/repository/chatRepo.js');
const MessagesRepo = require('./../../database/repository/msgRepo.js');

const createChat = (socket) => async (users, chatName) => {
    try{
        await ChatRepo.createChat({users, chatName});
        const chat = await ChatRepo.getConversation(users);
        socket.emit('newChat', chat.chatId, users);
    } catch(e){
        console.log(e);
    }
};

const chatMessage = (io) => async (message, id, chat) => {
    const {firstName} = await UsersRepo.getUser({id});

    const messageToPost = {
        chatId: +chat,
        msg: message,
        sender: id
    };

    await MessagesRepo.createMessage(messageToPost);
    io.to(+chat).emit('message', wrapper(firstName, message, id));
    io.to(+chat).emit('refreshChats', +chat, message);
};

const getChats = (socket) => async (id) => {
    const res = await ChatRepo.getChats(+id);
    const convs = await renderChats(res, +id);
    console.log(res.chatName);
    socket.emit('chats', convs);
};

const joinChat = (socket) => async (chat) => {
    socket.join(+chat);
    const messages = [];

    if(chat){
        const res = await MessagesRepo.getMessages(chat);

        res.map(msg => {
            messages.push({
                message: msg.msg, 
                time: msg.createdAt,
                firstName: msg.user.firstName,
                sender: msg.sender
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