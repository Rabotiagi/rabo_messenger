const chatRepo = require('../../database/repository/chatRepo.js');
const UsersRepo = require('../../database/repository/usersRepo.js');

const findUsers = (socket) => async (name, id) => {
    const res = [];
    const users = await UsersRepo.getAllUsers(name);

    for(let i = 0; i < users.length; i++){
        const user = users[i];
        const chat = await chatRepo.getConversation([user.id, id])

        res.push({firstName: user.firstName, fromConv: chat.chat_id });
    }

    socket.emit('show users', res);
};

module.exports = {
    findUsers
};