require('dotenv').config();
const app = require('fastify')({logger: true});
const fastifyStatic = require('fastify-static');
const fastifySocketIO = require('fastify-socket.io');
const multer = require('fastify-multer');
const path = require('path');
const socketRouter = require('./routers/socketRouter.js');
const httpRouter = require('./routers/httpRouter.js');

app.register(fastifyStatic, {
    root: path.resolve(__dirname, '../../dist')
});
app.register(multer.contentParser);
app.register(httpRouter);
app.register(fastifySocketIO);

app.ready().then(() => {
    app.io.on('connection', (socket) => {
        socket.IO = app.io;
        socketRouter(socket)
    });
});

module.exports = app;
