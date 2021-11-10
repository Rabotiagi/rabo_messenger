const config = require('dotenv').config();

if(config.error){
    throw config.error;
}

//const Users = require('./database/models/users');
const app = require('fastify')({logger: true});
const fastifyStatic = require('fastify-static');
const chatServer = require('./chat/chatServer.js');
const path = require('path');
const seq = require('./database/connection.js');
const Router = require('./routers/router.js');

app.register(Router);

app.register(fastifyStatic, {
    root: path.resolve(__dirname, '../application')
});

(async () => {
    //await seq.sync({force: true});

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
