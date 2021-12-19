const Messages = require('./../models/messages.js');
const Users = require('./../models/users.js');

module.exports = {
    async getMessages(chat){
        return await Messages.findAll({
            include: [Users],
            where: {chat}
        });
    },

    async createMessage(msg){
        await Messages.create(msg);
    }
};