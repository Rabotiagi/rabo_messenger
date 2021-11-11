const Users = require('../../database/models/users.js');

const getLastMsg = (messages) => {
    let max = 0;

    messages.forEach(msg => {
        if(msg.createdAt > max) max = msg;
    });

    return max;
};

const renderChats = async (dialogs, id) => {
    const convs = [];

    for(let i = 0; i < dialogs.length; i++){
        const dialog = dialogs[i];

        const { msg, createdAt, fromConv} = getLastMsg(dialog.messages);

        const partner = dialog.firstUser === id ? 
            dialog.secondUser : dialog.firstUser;

        const {firstName} = await Users.findOne({
            attributes: ['firstName'],
            where: {
                id: partner
            }
        });

        convs.push({firstName, fromConv, msg, createdAt});
    }

    return convs;
};

module.exports = renderChats;