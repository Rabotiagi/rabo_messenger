const UsersRepo = require('../../database/repository/usersRepo.js');
const MessagesRepo = require('../../database/repository/msgRepo.js');
const ChatRepo = require('../../database/repository/chatRepo.js');

const getLastmessage = (messages) => {
    let max = {createdAt: 0};

    messages.forEach(message => {
        if(message.createdAt > max.createdAt) max = message;
    });

    return max;
};

const renderChats = async (user_id) => {
    const chats = await ChatRepo.getChats(+user_id);
    const convs = [];

    for(let i = 0; i < chats.length; i++){
        const chat = chats[i];

        let messages = chat.messages.length ? chat.messages : 
            await MessagesRepo.getMessages(chat.chatId);
        
        const { msg, createdAt} = getLastmessage(messages);

        const partner = chat.users[0] === user_id ? 
            chat.users[1] : chat.users[0];
            
        const user = await UsersRepo.getUser(partner);
        const {chatName} = await ChatRepo.getChatName(chat.chatId);

        const members = chat.users.length > 2 ? chat.users : user.id;
        const name = chatName ? chatName : user.firstName;

        convs.push({id: members, name, chat: chat.chatId, msg, createdAt});
    }

    return convs;
};

const renderMessages = (input) => {
    const messages = [];
    const files = [];

    input.map(message => {
        const {msg, createdAt, sender, user} = message;
        messages.push({
            message: msg,
            time: createdAt,
            firstName: user.firstName,
            sender: sender
        });

        if(message.file){
            const {id, path, size} = message.file;
            files.push({
                id,
                fileName: path.split('/')[1].split('_')[1],
                size
            });
        }
    });

    return {messages, files};
};

module.exports = {
    renderChats,
    renderMessages,
    getLastmessage
};