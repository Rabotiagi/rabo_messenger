const multer = require("fastify-multer");
const MessagesRepo = require("../../database/repository/msgRepo.js");
const FilesRepo = require("../../database/repository/fileRepo.js");
const UsersRepo = require('../../database/repository/usersRepo.js');
const PhotosRepo = require('../../database/repository/photosRepo.js');
const { renderChats } = require('../utils/chats.js');
const wrapper = require('../utils/wrapper.js');

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

const getIndex = (req, reply) => {
    return reply.sendFile('/index.html');
};

const uploadFile = (io) => async (req, reply) => {
    console.log(io);
    const {user, chat} = req.body;
    const {firstName} = await UsersRepo.getUser({id: user});

    const {msgId} = await MessagesRepo.createMessage({
        chatId: +chat,
        msg: '',
        sender: +user
    });
    await FilesRepo.create(req.fileName, msgId, req.file.size);

    io.to(+chat).emit('message', wrapper(
        firstName,
        '',
        user
    ), chat);

    const chats = await renderChats(+user);
    io.to(+chat).emit('refreshChats', chats.find(
        c => c.chat === +chat
    ));

    reply.code(200).send();
};

const uploadPhoto = async (req, reply) => {
    await PhotosRepo.post(req.fileName, req.body.user);

    reply.code(200).send();
};

module.exports = {
    fileAPI,
    photoAPI,
    getIndex,
    uploadFile,
    uploadPhoto
};