const UsersRepo = require('../../database/repository/usersRepo.js');

const findUsers = (socket) => async (name, currentId) => {
    const res = [];
    const users = await UsersRepo.getAllUsers(name, currentId);

    users.map(u => {
        res.push({name: u.firstName, id: u.id});
    });

    socket.emit('show users', res);
};

module.exports = {
    findUsers
};