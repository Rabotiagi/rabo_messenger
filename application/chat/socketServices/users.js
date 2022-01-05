const UsersRepo = require('../../database/repository/usersRepo.js');

async function findUsers(name, currentId){
    const res = [];
    const users = await UsersRepo.getAllUsers(name, currentId);

    users.map(u => {
        res.push({name: u.firstName, id: u.id});
    });

    this.emit('show users', res);
}

module.exports = {
    findUsers
};