const Users = require('./../models/users.js');
const Photos = require('./../models/photos.js');
const Op = require('sequelize').Op;

module.exports = {
    async createUser(user){
        await Users.create(user);
    },

    async getUser(data){
        return await Users.findOne({where: data});
    },

    async getAllUsers(name, id){
        return await Users.findAll({
            where: {
                firstName: {
                    [Op.like]: `%${name}%`
                },
                id: {
                    [Op.ne]: id
                }
            }
        });
    },

    async getPhoto(id){
        return await Users.findOne({
            where: {id},
            include: [Photos]
        })
    }

};