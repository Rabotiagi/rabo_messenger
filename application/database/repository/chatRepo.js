const Chats = require('../models/chats.js');
const Messages = require('./../models/messages');
const Op = require('sequelize').Op;

module.exports = {
    async createChat(data){
        await Chats.create(data);
    },

    async addUser(user, chat_id){
        let users = await Chats.findOne({
            attributes: ['users'],
            where:{chat_id}
        });

        users = users.dataValues.users;
        users.push(user);
        await Chats.update({users}, {where: {chat_id}});
    },

    async removeUser(user, chat_id){
        let users = await Chats.findOne({
            attributes: ['users'],
            where: {chat_id}
        });

        users = users.dataValues.users.filter(u => u !== user);

        await Chats.update({users}, {where: {chat_id}});
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
    }
};