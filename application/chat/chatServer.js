require('dotenv').config();

const app = require('fastify')({logger: true});
const fastifyStatic = require('fastify-static');
const fastifySocketIO = require('fastify-socket.io');
const path = require('path');
const socketRouter = require('./socketRouters/socketRouter');

app.register(fastifyStatic, {
    root: path.resolve(__dirname, '../../dist')
});

app.register(fastifySocketIO);

app.get('/', (req, reply) => {
    return reply.sendFile('/index.html');
});

app.ready().then(() => {
    app.io.on('connection', (socket) => {
        socketRouter(app.io, socket)
    });
});

module.exports = app;
