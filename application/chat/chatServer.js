require('dotenv').config();
const app = require('fastify')({logger: true});
const fastifyStatic = require('fastify-static');
const fastifySocketIO = require('fastify-socket.io');
const multer = require('fastify-multer');
const path = require('path');
const socketRouter = require('./routers/socketRouter.js');
const serverRouter = require('./routers/serverRouter.js');

app.register(fastifyStatic, {
    root: path.resolve(__dirname, '../../dist')
});
app.register(multer.contentParser);
app.register(serverRouter);
app.register(fastifySocketIO);

app.ready().then(() => {
    app.io.on('connection', (socket) => {
        socketRouter(app.io, socket)
    });
});

module.exports = app;
