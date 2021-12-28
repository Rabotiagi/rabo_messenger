const wrapper = require('../utils/wrapper.js');
const {renderChats, renderMessages} = require('../utils/chats.js');
const UsersRepo = require('./../../database/repository/usersRepo.js');
const ChatRepo = require('./../../database/repository/chatRepo.js');
const MessagesRepo = require('./../../database/repository/msgRepo.js');
const FilesRepo = require('./../../database/repository/fileRepo.js');
const fs = require('fs');

const createChat = (io) => async (users, chatName) => {
    try{
        await ChatRepo.createChat({users, chatName});
        const chat = await ChatRepo.getConversation(users);

        io.sockets.sockets.forEach((s) => {
            if(users.includes(s.userId)){
                s.emit('newChat', chat.chatId, users);
            }
        });
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
    io.to(+chat).emit('message', wrapper(firstName, message, id), chat);

    const chats = await renderChats(+id);
    const chatToRender = chats.find(c => c.chat === +chat);
    io.to(+chat).emit('refreshChats', chatToRender);
};

const getChats = (socket) => async (id) => {
    const convs = await renderChats(+id);
    socket.emit('chats', convs);
};

const joinChat = (socket) => async (chat) => {
    socket.join(+chat);

    let messages = await MessagesRepo.getMessages(chat);
    messages = messages.sort((m1, m2) => {
        return new Date(m2.createdAt) - new Date(m1.createdAt);
    }).reverse();

    const result = renderMessages(messages);
    socket.emit('history', result.messages, result.files);
};

const getFile = (socket) => async (fileId) => {
    console.log(__dirname);
    const {path} = await FilesRepo.getFilePath(fileId);
    const stream = fs.createReadStream('/run/media/yaroslav_els/86C6A702C6A6F19B/yaroslavels/projects/rabo_messenger/application/database/' + path);

    socket.emit('file', stream);
};

const deleteChat = async (chat) => {
    await ChatRepo.removeChat(+chat);
};

module.exports = {
    chatMessage,
    joinChat,
    getChats,
    createChat,
    deleteChat,
    getFile
};