const Messages = require('../../database/models/messages.js');
const Users = require('../../database/models/users.js');

const renderChats = async (dialogs, id) => {
    const convs = [];

    for(let i = 0; i < dialogs.length; i++){
        const dialog = dialogs[i];

        const { msg, createdAt} = dialog.messages.pop();

        const partner = dialog.firstUser === id ? 
            dialog.secondUser : dialog.firstUser;

        const {firstName} = await Users.findOne({
            attributes: ['firstName'],
            where: {
                id: partner
            }
        });

        convs.push({firstName, partner, msg, createdAt});
    }

    return convs;
};

module.exports = renderChats;