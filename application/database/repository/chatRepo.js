const Chats = require('../models/chats.js');
const Messages = require('./../models/messages');
const Op = require('sequelize').Op;

module.exports = {
    async createChat(data){
        await Chats.create(data);
    },

    async addUser(user, chatId){
        let users = await Chats.findOne({
            attributes: ['users'],
            where:{chatId}
        });

        users = users.dataValues.users;
        users.push(user);
        await Chats.update({users}, {where: {chatId}});
    },

    async removeUser(user, chatId){
        let users = await Chats.findOne({
            attributes: ['users'],
            where: {chatId}
        });

        users = users.dataValues.users.filter(u => u !== user);

        await Chats.update({users}, {where: {chatId}});
    },

    async getConversation(users){
        const original = users.filter(e => true);

        return await Chats.findOne({
            where: {
                [Op.or]: [
                    {
                        users: original
                    },
                    {
                        users: users.reverse()
                    }
                ]
            }
        });
    },

    async getChats(user_id){
        return await Chats.findAll({
            where: {
                users:{
                    [Op.contains]: [user_id]
                }
            },
            include: [Messages]
        });
    },

    async getChatName(chatId){
        return await Chats.findOne({
            attributes: ['chatName'],
            where: {chatId}
        });
    },

    async removeChat(){
        
    }
};