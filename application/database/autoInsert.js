const UsersRepo = require('./repository/usersRepo.js');

const insert = async () => {
    await UsersRepo.createUser({
        email: '123',
        password: '123',
        firstName: '123',
        lastName: '123'
    });
    await UsersRepo.createUser({
        email: 'qwe',
        password: 'qwe',
        firstName: 'qwe',
        lastName: 'qwe'
    });
    await UsersRepo.createUser({
        email: 'asd',
        password: 'asd',
        firstName: 'asd',
        lastName: 'asd'
    });
};

module.exports = insert;