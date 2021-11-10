const path = require('path');

const getIndex = (req, reply) => {
    return reply.sendFile('/views/login.html');
};

const postIndex = (req, reply) => {

};

module.exports = {getIndex, postIndex};