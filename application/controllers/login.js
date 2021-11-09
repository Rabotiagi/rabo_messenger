const path = require('path');

user = {login: 'yaroslav', password: '123'}


const getLogin = (req, reply) => {
    //reply.send(path.resolve(__dirname, '../views/login.html'));
    reply.redirect('http://localhost:3000/login.html');
};

const postLogin = (req, res) => {
    if (req.body.email === user.login && req.body.password === user.password) {
        res.code(200).send();
    } else {
        res.code(403).send();
    }
};

module.exports = {getLogin, postLogin};