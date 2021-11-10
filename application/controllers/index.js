const path = require('path');

const getIndex = (req, reply) => {
    return reply.redirect('/login');
};

const postIndex = (req, reply) => {

};

module.exports = {getIndex, postIndex};