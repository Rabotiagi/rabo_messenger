const path = require('path');

const getLogin = (req, reply) => {
    //reply.send(path.resolve(__dirname, '../views/login.html'));
    reply.redirect('http://localhost:3000/login.html');
};

const postLogin = (req, res) => {

};

module.exports = {getLogin, postLogin};