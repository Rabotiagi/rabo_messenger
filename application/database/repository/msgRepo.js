const Messages = require('./../models/messages.js');
const Users = require('./../models/users.js');

module.exports = {
    async getMessages(chatId){
        return await Messages.findAll({
            include: [Users],
            where: {chatId}
        });
    },

    async createMessage(msg){
        await Messages.create(msg);
    }
};