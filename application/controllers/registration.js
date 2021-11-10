const path = require('path');
const Users = require('../database/models/users.js');

const getReg = (req, reply) => {
    reply.sendFile('/views/register.html');
};

const postReg = async (req, reply) => {
    const user = {};
    const body = req.body.split('\r\n');
    body.pop();
    
    body.map(prop => {
        prop = prop.split('=');
        user[prop[0]] = prop[1];
    });
    
    const prevUser = await Users.findOne({where: {email: user.email}});
    if(prevUser){
        reply.redirect('/registration');
        return;
    }

    await Users.create(user);
    reply.redirect('/login');
};

module.exports = {getReg, postReg};