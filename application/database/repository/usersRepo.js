const Users = require('./../models/users.js');
const Op = require('sequelize').Op;

module.exports = {
    async createUser(user){
        await Users.create(user);
    },

    async getUser(data){
        return await Users.findOne({where: data});
    },

    async getAllUsers(name){
        return await Users.findAll({
            where: {
                firstName: {
                    [Op.like]: `%${name}%`
                }
            }
        });
    }
};