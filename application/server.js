require('dotenv').config();
const app = require('fastify')({logger: true});
const fastifyStatic = require('fastify-static');
const chatServer = require('./chat/chatServer.js');
const path = require('path');
const seq = require('./database/connection.js');
const Router = require('./routers/router.js');
const associate = require('./database/associate.js');
const autoInsert = require('./database/autoInsert.js');
const multer = require('fastify-multer');

app.register(multer.contentParser);
app.register(Router);
app.register(fastifyStatic, {
    root: path.resolve(__dirname, '../application')
});

app.addHook('onRequest', (req, reply, done) => {
    if(req.url.includes('database/files') || req.url.includes('upload')) reply.header('Access-Control-Allow-Origin',process.env.CHAT_URL);
    done();
});

(async () => {
    associate();
    await seq.sync({force: true});
    await autoInsert();

    await app.listen(process.env.PORT, (err) => {
        if(err){
            throw err;
        }
    
        console.log(`App server is running on port ${process.env.PORT}`);
    });
    
    await chatServer.listen(process.env.CHAT_PORT, (err) => {
        if(err){
            throw err;
        }
    
        console.log(`Chat server is running on port ${process.env.CHAT_PORT}`);
    });
})();
