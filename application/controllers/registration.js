const path = require('path');

const getReg = (req, reply) => {
    //reply.send(path.resolve(__dirname, '../views/register.html'));
    reply.redirect('http://localhost:3000/register.html');
};

const postReg = (req, reply) => {
    
};

module.exports = {getReg, postReg};