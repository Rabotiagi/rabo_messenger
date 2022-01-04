// const multer = require("fastify-multer");
// const MessagesRepo = require("../../database/repository/msgRepo.js");
// const FilesRepo = require("../../database/repository/fileRepo.js");
// const UsersRepo = require('../../database/repository/usersRepo.js');
// const { renderChats } = require('../utils/chats.js');
// const wrapper = require('../utils/wrapper.js');
//
// const storage = multer.diskStorage({
//     destination: './database/files/',
//     filename: function(req, file, cb){
//         req.fileName = Date.now() + '_' + file.originalname;
//         cb(null, req.fileName);
//     }
// });
// const upload = multer({storage});
const {
    fileAPI,
    photoAPI,
    getIndex,
    uploadFile,
    uploadPhoto
} = require('../httpServices/fileProcessing');

function Router(fastify, opts, done){
    fastify.get('/', getIndex);
    fastify.post('/file', {preHandler: fileAPI.single('file')}, uploadFile);
    fastify.post('/photo', {preHandler: photoAPI.single('file')}, uploadPhoto);
    // fastify.get('/', (req, reply) => {
    //     return reply.sendFile('/index.html');
    // });
    //
    // fastify.post('/photo', {preHandler: upload.single('photo')}, async (req, reply) => {
    //
    // });
    //
    // fastify.post('/file', {preHandler: fileAPI.single('file')}, async (req, reply) => {
    //     const {user, chat} = req.body;
    //     const {firstName} = await UsersRepo.getUser({id: user});
    //
    //     const {msgId} = await MessagesRepo.createMessage({
    //         chatId: +chat,
    //         msg: '',
    //         sender: +user
    //     });
    //     await FilesRepo.create(req.fileName, msgId, req.file.size);
    //
    //     fastify.io.to(+chat).emit('message', wrapper(
    //         firstName,
    //         '',
    //         user
    //     ), chat);
    //
    //     const chats = await renderChats(+user);
    //     fastify.io.to(+chat).emit('refreshChats', chats.find(
    //         c => c.chat === +chat
    //     ));
    //
    //     reply.code(200).send();
    // });

    done();
}

module.exports = Router;