const path = require('path');

const getLogin = (req, reply) => {
    return reply.sendFile('/views/login.html');
};

const postLogin = (req, reply) => {
    console.log(JSON.stringify(req.body));
    if (req.body.includes(`email=yaroslav`) && req.body.includes(`password=123`)) {
        return reply.redirect('http://localhost:3001/')
    } else {
        reply.code(403).send();
    }
};

module.exports = {getLogin, postLogin};