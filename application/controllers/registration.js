const path = require('path');

const getReg = (req, reply) => {
    return reply.sendFile('/views/register.html');
};

const postReg = (req, reply) => {
    console.log(req.body);
};

module.exports = {getReg, postReg};