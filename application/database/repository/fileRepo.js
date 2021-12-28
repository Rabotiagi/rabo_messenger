const Files = require('../models/files.js');
const Messages = require('../models/messages.js');

module.exports = {
    async create(sender, fileName, chatId, size){
        const {msgId} = await Messages.create({
            sender,
            chatId,
            msg: ''
        });
        
        await Files.create({
            fromMsg: msgId,
            path: 'files/' + fileName,
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