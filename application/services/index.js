require('dotenv').config();

const getIndex = (req, reply) => {
    reply.redirect(process.env.CHAT_URL);
};

module.exports = getIndex;