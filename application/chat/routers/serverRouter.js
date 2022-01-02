const multer = require("fastify-multer");
const MessagesRepo = require("../../database/repository/msgRepo.js");
const {getLastMessage} = require("../utils/chats.js");
const FilesRepo = require("../../database/repository/fileRepo.js");

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
        const messages = await MessagesRepo.getMessages(req.body.chat);
        const {msgId} = getLastMessage(messages);

        await FilesRepo.create(req.fileName, msgId, req.file.size);
        reply.code(200).send();
    });

    done();
}

module.exports = Router;