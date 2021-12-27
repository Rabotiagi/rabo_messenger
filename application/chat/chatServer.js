require('dotenv').config();
const app = require('fastify')({logger: true});
const fastifyStatic = require('fastify-static');
const fastifySocketIO = require('fastify-socket.io');
const multer = require('fastify-multer');
const path = require('path');
const socketRouter = require('./socketRouters/socketRouter');

const storage = multer.diskStorage({
    destination: '../database/files/',
    filename: function(req, file, cb){
        cb(null, req.body.name + '-' + Date.now());
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

app.post('/chat/upload', {preHandler: upload.single('file')}, (req, reply) => {
    reply.code(200).send('SUCCESS!!!');
});

app.ready().then(() => {
    app.io.on('connection', (socket) => {
        socketRouter(app.io, socket)
    });
});

module.exports = app;
