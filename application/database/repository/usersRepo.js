const Users = require('./../models/users.js');

module.exports = {
    async createUser(user){
        await Users.create(user);
    },

    async getUser(data){
        return await Users.findOne({where: data});
    }
};