const path = require('path');
const Users = require('../database/models/users.js');

const getLogin = (req, reply) => {
    reply.sendFile('/views/login.html');
};

const postLogin = async (req, reply) => {
    const data = {};
    const body = req.body.split('\r\n');
    body.pop();
    
    body.map(prop => {
        prop = prop.split('=');
        data[prop[0]] = prop[1];
    });
    
    const user = await Users.findOne({where: data});
    console.dir(user);

    if (user) {
        reply.header('Set-Cookie', `user-id=${user.dataValues.id}`).redirect('/chat');
        return;
    }
 
    reply.redirect('/login');
};

module.exports = {getLogin, postLogin};