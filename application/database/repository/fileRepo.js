const Files = require('../models/files.js');

module.exports = {
    async create(fileName, fromMsg, size){
        await Files.create({
            fromMsg,
            path: fileName,
            size
        });
    },

    async getFilePath(fileId){
        return await Files.findOne({
            where: {fileId},
            attributes: ['path']
        });
    }
};