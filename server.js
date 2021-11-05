require('dotenv').config();

const express = require('express');
const path = require('path');
const chatServer = require('./chat/chatServer.js');

const app = express();

app.get('/', (req, res) => {
    res.redirect('http://localhost:3001/');
});

chatServer.listen(process.env.CHAT_PORT, () => {
    console.log(`Server server is running on port ${process.env.CHAT_PORT}`);
});

app.listen(process.env.PORT, () => {
    console.log(`App server is running on port ${process.env.PORT}`);
});