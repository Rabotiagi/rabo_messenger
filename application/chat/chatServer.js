require('dotenv').config();
const app = require('fastify')({logger: true});
const fastifyStatic = require('fastify-static');
const fastifySocketIO = require('fastify-socket.io');
const multer = require('fastify-multer');
const path = require('path');
const socketRouter = require('./routers/socketRouter.js');
const serverRouter = require('./routers/serverRouter.js');
// const FilesRepo = require('../database/repository/fileRepo.js');
// const MessagesRepo = require('../database/repository/msgRepo.js');
// const {getLastMessage} = require('./utils/chats.js');

// const storage = multer.diskStorage({
//     destination: './database/files/',
//     filename: function(req, file, cb){
//         req.fileName = Date.now() + '_' + file.originalname;
//         cb(null, req.fileName);
//     }
// });
// const upload = multer({storage});

app.register(fastifyStatic, {
    root: path.resolve(__dirname, '../../dist')
});
app.register(multer.contentParser);
app.register(serverRouter);
app.register(fastifySocketIO);

// app.get('/', (req, reply) => {
//     return reply.sendFile('/index.html');
// });
//
// app.post('/upload', {preHandler: upload.single('file')}, async (req, reply) => {
//     const messages = await MessagesRepo.getMessages(req.body.chat);
//     const {msgId} = getLastMessage(messages);
//
//     await FilesRepo.create(req.fileName, msgId, req.file.size);
//     reply.code(200).send();
// });

app.ready().then(() => {
    app.io.on('connection', (socket) => {
        socketRouter(app.io, socket)
    });
});

module.exports = app;
