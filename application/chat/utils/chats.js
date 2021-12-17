const UsersRepo = require('../../database/repository/usersRepo.js');
const MessagesRepo = require('../../database/repository/msgRepo.js');
const ChatsRepo = require('../../database/repository/chatRepo.js');
const Chats = require('../../database/models/chats.js');

const getLastMsg = (messages) => {
    let max = {createdAt: 0};

    messages.forEach(msg => {
        if(msg.createdAt > max.createdAt) max = msg;
    });

    return max;
};

const renderChats = async (dialogs, user_id) => {
    const convs = [];

    for(let i = 0; i < dialogs.length; i++){
        const dialog = dialogs[i];

        let msgs = dialog.messages.length ? dialog.messages : 
            await MessagesRepo.getMessages(dialog.chat_id);
        
        const { msg, createdAt} = getLastMsg(msgs);

        const partner = dialog.users[0] === user_id ? 
            dialog.users[1] : dialog.users[0];

        const {firstName, id} = await UsersRepo.getUser(partner);
        const {chatName} = await ChatsRepo.getChatName(dialog.chat_id);
        const name = chatName ? chatName : firstName;

        convs.push({id, name, fromConv: dialog.chat_id, msg, createdAt});
    }

    return convs;
};

module.exports = renderChats;