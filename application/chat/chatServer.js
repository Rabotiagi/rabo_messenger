require('dotenv').config();

const app = require('fastify')({logger: true});
const fastifyStatic = require('fastify-static');
const fastifySocketIO = require('fastify-socket.io');
const wrapper = require('./services/wrapper.js');
const path = require('path');

app.register(fastifyStatic, {
    root: '/run/media/yaroslav_els/86C6A702C6A6F19B/yaroslavels/projects/Metanet/application'
});

app.register(fastifySocketIO);

app.get('/', (req, reply) => {
    return reply.sendFile('/views/index.html');
});

app.ready().then(() => {
    app.io.on('connection', (socket) => {
        socket.on('chatMessage', (message) => {
            app.io.emit('message', wrapper('user', message));
        });
    });
});

module.exports = app;
