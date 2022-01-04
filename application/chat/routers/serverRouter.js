const multer = require("fastify-multer");
const MessagesRepo = require("../../database/repository/msgRepo.js");
const FilesRepo = require("../../database/repository/fileRepo.js");
const UsersRepo = require('../../database/repository/usersRepo.js');
const { renderChats } = require('../utils/chats.js');
const wrapper = require('../utils/wrapper.js');

const storage = multer.diskStorage({
    destination: './database/files/',
    filename: function(req, file, cb){
        req.fileName = Date.now() + '_' + file.originalname;
        cb(null, req.fileName);
    }
});
const upload = multer({storage});

function Router(fastify, opts, done){
    fastify.get('/', (req, reply) => {
        return reply.sendFile('/index.html');
    });

    fastify.post('/upload', {preHandler: upload.single('file')}, async (req, reply) => {
        const {user, chat} = req.body;
        const {firstName} = await UsersRepo.getUser({id: user});

        const {msgId} = await MessagesRepo.createMessage({
            chatId: +req.body.chat,
            msg: '',
            sender: +req.body.chat
        });
        await FilesRepo.create(req.fileName, msgId, req.file.size);

        fastify.io.to(+chat).emit('message', wrapper(
            firstName,
            '',
            user
        ), chat);

        const chats = await renderChats(+user);
        fastify.io.to(+chat).emit('refreshChats', chats.find(
            c => c.chat === +chat
        ));

        reply.code(200).send();
    });

    done();
}

module.exports = Router;