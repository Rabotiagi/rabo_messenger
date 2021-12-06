const UsersRepo = require('../../database/repository/usersRepo.js');

const findUsers = (socket) => async (name) => {
    socket.emit('show users', await UsersRepo.getAllUsers(name));
};

module.exports = {
    findUsers
};