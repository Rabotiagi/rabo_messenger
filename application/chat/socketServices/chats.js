const wrapper = require('../utils/wrapper.js');
const {renderChats, renderMessages} = require('../utils/dataProcessing.js');
const UsersRepo = require('./../../database/repository/usersRepo.js');
const ChatRepo = require('./../../database/repository/chatRepo.js');
const MessagesRepo = require('./../../database/repository/msgRepo.js');

async function createChat(users, chatName){
    await ChatRepo.createChat({users, chatName});
    const chat = await ChatRepo.getConversation(users);

    this.IO.sockets.sockets.forEach((s) => {
        if(users.includes(s.userId)){
            s.emit('newChat', chat.chatId, users);
        }
    });
}

async function chatMessage(message, id, chat){
    const {firstName} = await UsersRepo.getUser({id});
    const messageToPost = {
        chatId: +chat,
        msg: message,
        sender: id
    };

    await MessagesRepo.createMessage(messageToPost);
    this.IO.to(+chat).emit('message', wrapper(firstName, message, id), chat);

    const chats = await renderChats(+id);
    const chatToRender = chats.find(c => c.chat === +chat);
    this.IO.to(+chat).emit('refreshChats', chatToRender);
}

async function getChats(id){
    this.emit('chats', await renderChats(+id));
}

async function joinChat(chat){
    this.join(+chat);

    let messages = await MessagesRepo.getMessages(chat);
    messages = messages.sort((m1, m2) => {
        return new Date(m2.createdAt) - new Date(m1.createdAt);
    }).reverse();

    const result = renderMessages(messages);
    this.emit('history', result.messages, result.files);
}

const deleteChat = async (chat) => {
    await ChatRepo.removeChat(+chat);
};

module.exports = {
    chatMessage,
    joinChat,
    getChats,
    createChat,
    deleteChat
};