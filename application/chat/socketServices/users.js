const chatRepo = require('../../database/repository/chatRepo.js');
const UsersRepo = require('../../database/repository/usersRepo.js');

const findUsers = (socket) => async (name, id) => {
    const res = [];
    const users = await UsersRepo.getAllUsers(name);

    for(let i = 0; i < users.length; i++){
        const user = users[i];
        const chat = await chatRepo.getConversation([user.id, id]);

        const fromConv = chat ? chat : null;

        res.push({firstName: user.firstName, fromConv });
    }

    socket.emit('show users', res);
};

module.exports = {
    findUsers
};