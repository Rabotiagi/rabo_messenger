const Photos = require('../models/photos.js');

module.exports = {
    async post(fileName, userId){
        await Photos.create({
            userId,
            path: fileName
        });
    },

    async getPhoto(userId){
        return await Photos.findOne({where: {userId}});
    },

    async updatePhoto(photoId, path){
        await Photos.update({path}, {where: {photoId}});
    }
};