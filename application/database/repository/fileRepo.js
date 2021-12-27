const Files = require('../models/files.js');

module.exports = {
    async create(fromMsg, fileName){
        return await Files.create({
            fromMsg,
            path: 'files/' + fileName
        });
    }
};