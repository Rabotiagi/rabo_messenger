const path = require('path');

const getIndex = (req, reply) => {
    reply.redirect('http://localhost:3001');
};

module.exports = getIndex;