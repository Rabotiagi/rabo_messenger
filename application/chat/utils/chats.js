const UsersRepo = require('../../database/repository/usersRepo.js');

const getLastMsg = (messages) => {
    let max = {createdAt: 0};

    messages.forEach(msg => {
        if(msg.createdAt > max.createdAt) max = msg;
    });

    return max;
};

const renderChats = async (dialogs, id) => {
    const convs = [];

    for(let i = 0; i < dialogs.length; i++){
        const dialog = dialogs[i];

        const { msg, createdAt, fromConv} = getLastMsg(dialog.messages);

        const partner = dialog.users[0] === id ? 
            dialog.users[1] : dialog.users[0];

        const {firstName} = await UsersRepo.getUser(partner);

        convs.push({firstName, fromConv, msg, createdAt});
    }

    return convs;
};

module.exports = renderChats;