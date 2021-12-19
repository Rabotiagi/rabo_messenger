const chatRepo = require('../../database/repository/chatRepo.js');
const UsersRepo = require('../../database/repository/usersRepo.js');

const findUsers = (socket) => async (name, currentId) => {
    const res = [];
    const users = await UsersRepo.getAllUsers(name, currentId);

    for(let i = 0; i < users.length; i++){
        const {id, firstName} = users[i];
        const chat = await chatRepo.getConversation([id, currentId]);
        console.log(chat);

        res.push({name: firstName, id });
    }

    console.log(res);

    socket.emit('show users', res);
};

module.exports = {
    findUsers
};