require('dotenv').config();
const app = require('fastify')({logger: true});
const fastifyStatic = require('fastify-static');
const fastifySocketIO = require('fastify-socket.io');
const multer = require('fastify-multer');
const path = require('path');
const socketRouter = require('./socketRouters/socketRouter');
const FilesRepo = require('../database/repository/fileRepo.js');

const storage = multer.diskStorage({
    destination: './database/files/',
    filename: function(req, file, cb){
        req.fileName = file.originalname;
        cb(null, file.originalname.split('.')[0] + '-' + Date.now());
    }
});
const upload = multer({storage});

app.register(fastifyStatic, {
    root: path.resolve(__dirname, '../../dist')
});
app.register(multer.contentParser);
app.register(fastifySocketIO);

app.get('/', (req, reply) => {
    return reply.sendFile('/index.html');
});

app.post('/upload', {preHandler: upload.single('file')}, async (req, reply) => {
    await FilesRepo.create(req.body.user, req.fileName, req.body.chat);
    reply.code(200).send();
});

app.ready().then(() => {
    app.io.on('connection', (socket) => {
        socketRouter(app.io, socket)
    });
});

module.exports = app;
