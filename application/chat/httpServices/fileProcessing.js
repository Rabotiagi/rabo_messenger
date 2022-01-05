const multer = require("fastify-multer");
const MessagesRepo = require("../../database/repository/msgRepo.js");
const FilesRepo = require("../../database/repository/fileRepo.js");
const UsersRepo = require('../../database/repository/usersRepo.js');
const PhotosRepo = require('../../database/repository/photosRepo.js');
const { renderChats } = require('../utils/dataProcessing.js');
const wrapper = require('../utils/wrapper.js');
const fs = require('fs');
const path = require('path');

const fileStorage = multer.diskStorage({
    destination: './database/files/',
    filename: function(req, file, cb){
        req.fileName = Date.now() + '_' + file.originalname;
        cb(null, req.fileName);
    }
});
const photoStorage = multer.diskStorage({
    destination: './database/photos/',
    filename: function(req, file, cb){
        req.fileName = Date.now() + '_' + file.originalname;
        cb(null, req.fileName);
    }
});

const fileAPI = multer({storage: fileStorage});
const photoAPI = multer({storage: photoStorage});

async function uploadFile(req, reply){
    const {user, chat} = req.body;
    const {firstName} = await UsersRepo.getUser({id: user});

    const {msgId} = await MessagesRepo.createMessage({
        chatId: +chat,
        msg: '',
        sender: +user
    });
    await FilesRepo.create(req.fileName, msgId, req.file.size);

    this.io.to(+chat).emit('message', wrapper(firstName, '', user), chat);

    const chats = await renderChats(+user);
    this.io.to(+chat).emit('refreshChats', chats.find(
        c => c.chat === +chat
    ));

    reply.code(200).send();
}

const uploadPhoto = async (req, reply) => {
    const old = await PhotosRepo.getPhoto(req.body.user);
    if(old){
        await fs.promises.rm(path.join(__dirname, '../../database/photos/', old.path));
        await PhotosRepo.updatePhoto(old.photoId, req.fileName);

        return reply.code(200).send();
    }

    await PhotosRepo.post(req.fileName, req.body.user);

    reply.code(200).send();
};

module.exports = {
    fileAPI,
    photoAPI,
    uploadFile,
    uploadPhoto
};