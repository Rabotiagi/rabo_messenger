const Photos = require('../models/photos.js');

module.exports = {
    async post(fileName, userId){
        await Photos.create({
            userId,
            path: fileName
        });
    }
};