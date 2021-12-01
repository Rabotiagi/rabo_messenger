const Chats = require('./../models/conversations.js');
const Messages = require('./../models/messages');
const {or} = require('sequelize').Op;

module.exports = {
    async createChat(data){
        await Chats.create(data);
    },

    async getChats(user){
        return await Chats.findAll({
            where: {
                [or]: [
                    {firstUser: user},
                    {secondUser: user}
                ]
            },
            include: [Messages]
        });
    }
};