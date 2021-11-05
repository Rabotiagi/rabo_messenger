require('dotenv').config();

const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const wrapper = require('./services/wrapper.js');
const {
    createUser,
    findUser,
    disconnectUser,
    getRoomUsers,
} = require("./services/users.js");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, './views/index.html'));
});

io.on('connection', (socket) => {
    socket.on("joinRoom", ({ username, room }) => {
        createUser(socket.id, username, room);

        socket.join(room);
    });

    socket.on("chatMessage", (message) => {
        const user = findUser(socket.id);

        io.to(user.room).emit("message", wrapper(user.username, message));
    });

    socket.on("disconnect", () => {
        const user = disconnectUser(socket.id);

        io.to(user.room).emit('refreshChat', {
            users: getRoomUsers(user.room),
            room: user.room
        });
    });
});

server.listen(process.env.CHAT_PORT, () => {
    console.log(`Chat server is running on port ${process.env.CHAT_PORT}`);
});
//module.exports = server;