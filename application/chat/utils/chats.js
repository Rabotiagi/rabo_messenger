const UsersRepo = require('../../database/repository/usersRepo.js');
const {getMessages} = require('../../database/repository/msgRepo.js');

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
            await getMessages(dialog.chat_id);

        const { msg, createdAt, fromConv} = getLastMsg(msgs);

        const partner = dialog.users[0] === user_id ? 
            dialog.users[1] : dialog.users[0];

        const {firstName, id} = await UsersRepo.getUser(partner);

        convs.push({id, firstName, fromConv, msg, createdAt});
    }

    return convs;
};

module.exports = renderChats;