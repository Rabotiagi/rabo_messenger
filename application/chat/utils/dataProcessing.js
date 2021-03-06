const UsersRepo = require('../../database/repository/usersRepo.js');
const MessagesRepo = require('../../database/repository/msgRepo.js');
const ChatRepo = require('../../database/repository/chatRepo.js');

const getPhoto = async (id) => {
    const {photo} = await UsersRepo.getPhoto(id);
    return photo ? photo.path : null;
};

const getLastMessage = (messages) => {
    let max = {createdAt: 0};

    messages.forEach(message => {
        if(message.createdAt > max.createdAt) max = message;
    });

    return max;
};

const renderChats = async (userId) => {
    const chats = await ChatRepo.getChats(+userId);
    const convs = [];

    for(let i = 0; i < chats.length; i++){
        const chat = chats[i];

        let messages = chat.messages.length ? chat.messages :
            await MessagesRepo.getMessages(chat.chatId);
        
        const { msg, createdAt} = getLastMessage(messages);

        const partner = chat.users[0] === +userId ? chat.users[1] : chat.users[0];
            
        const user = await UsersRepo.getUser(partner);
        const {chatName} = await ChatRepo.getChatName(chat.chatId);

        const members = chat.users.length > 2 ? chat.users : user.id;
        const name = chatName ? chatName : user.firstName;

        convs.push({
            id: members,
            name, msg,
            chat: chat.chatId,
            createdAt,
            photo: await getPhoto(partner)
        });
    }

    return convs;
};

const renderMessages = (input) => {
    const messages = [];
    const files = [];

    input.map(message => {
        const {msgId, msg, createdAt, sender, user} = message;
        messages.push({
            id: msgId,
            message: msg,
            time: createdAt,
            firstName: user.firstName,
            sender: sender
        });

        if(message.file){
            const {fileId, path, size, fromMsg} = message.file;
            files.push({
                fromMsg,
                fileId,
                fileName: path,
                size
            });
        }
    });
    return {messages, files};
};

module.exports = {
    renderChats,
    renderMessages,
    getLastMessage
};