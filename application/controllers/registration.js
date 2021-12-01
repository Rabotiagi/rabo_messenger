const UsersRepo = require('../database/repository/usersRepo.js');

const getReg = (req, reply) => {
    reply.sendFile('/views/register.html');
};

const postReg = async (req, reply) => {
    const data = {};
    const body = req.body.split('\r\n');
    body.pop();
    
    body.map(prop => {
        prop = prop.split('=');
        data[prop[0]] = prop[1];
    });
    
    const prevUser = await UsersRepo.getUser({email: data.email});
    if(prevUser){
        reply.redirect('/registration');
        return;
    }

    await UsersRepo.createUser(data);
    reply.redirect('/login');
};

module.exports = {getReg, postReg};