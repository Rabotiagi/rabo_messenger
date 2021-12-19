const UsersRepo = require('../../database/repository/usersRepo.js');
const MessagesRepo = require('../../database/repository/msgRepo.js');
const ChatsRepo = require('../../database/repository/chatRepo.js');

const getLastMsg = (messages) => {
    let max = {createdAt: 0};

    messages.forEach(msg => {
        if(msg.createdAt > max.createdAt) max = msg;
    });

    return max;
};

const renderChats = async (chats, user_id) => {
    const convs = [];

    for(let i = 0; i < chats.length; i++){
        const chat = chats[i];

        let msgs = chat.messages.length ? chat.messages : 
            await MessagesRepo.getMessages(chat.chatId);
        
        const { msg, createdAt} = getLastMsg(msgs);

        const partner = chat.users[0] === user_id ? 
            chat.users[1] : chat.users[0];

        const user = await UsersRepo.getUser(partner);
        const {chatName} = await ChatsRepo.getChatName(chat.chatId);

        const members = chat.users.length > 2 ? chat.users : user.id;
        const name = chatName ? chatName : user.firstName;

        convs.push({id: members, name, chat: chat.chatId, msg, createdAt});
    }

    return convs;
};

module.exports = renderChats;