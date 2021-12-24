const UsersRepo = require('./repository/usersRepo.js');
const ChatsRepo = require('./repository/chatRepo.js');
const MessagesRepo = require('./repository/msgRepo.js');

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
    await ChatsRepo.createChat({
        users: [1, 2],
    });
    await ChatsRepo.createChat({
        users: [2, 3],
    });
    await MessagesRepo.createMessage({
        chatId: 1,
        msg: 'Some message in conversation',
        sender: 1
    });
    await MessagesRepo.createMessage({
        chatId: 1,
        msg: 'Some message in conversation',
        sender: 2
    });
    await MessagesRepo.createMessage({
        chatId: 2,
        msg: 'Some message in conversation',
        sender: 2
    });
    await MessagesRepo.createMessage({
        chatId: 2,
        msg: 'Some message in conversation',
        sender: 3
    });
};

module.exports = insert;