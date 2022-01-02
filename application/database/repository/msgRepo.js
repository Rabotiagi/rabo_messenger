const Messages = require('./../models/messages.js');
const Users = require('./../models/users.js');
const Files = require('./../models/files.js');

module.exports = {
    async getMessages(chatId){
        return await Messages.findAll({
            include: [Users, Files],
            where: {chatId}
        });
    },

    async createMessage(msg){
        return await Messages.create(msg);
    },

    async removeMessages(chatId){
        await Messages.destroy({
            where: {chatId}
        });
    }
};