const path = require('path');

user = {login: 'yaroslav', password: '123'}

const getLogin = (req, reply) => {
    return reply.sendFile('/views/login.html');
};

const postLogin = (req, reply) => {
    if (req.body.email === user.login && req.body.password === user.password) {
        reply.code(200).send();
    } else {
        reply.code(403).send();
    }
};

module.exports = {getLogin, postLogin};