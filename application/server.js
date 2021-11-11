const config = require('dotenv').config();

if(config.error){
    throw config.error;
}

const Users = require('./database/models/users.js');
const Conversations = require('./database/models/conversations.js');
const Messages = require('./database/models/messages.js');
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
    Conversations.hasMany(Messages, {
        foreignKey: 'fromConv',
        sourceKey: 'conv_id'
    });
    
    Messages.belongsTo(Conversations, {
        foreignKey: 'fromConv',
        targetKey: 'conv_id'
    });
    
    Users.hasMany(Messages, {
        foreignKey: 'sender',
        sourceKey: 'id'
    });

    Messages.belongsTo(Users, {
        foreignKey: 'sender',
        targetKey: 'id'
    });

    

    await seq.sync({force: true});

    await Conversations.create({
        firstUser: 1,
        secondUser: 3
    });

    await Users.create({
        email: 'who',
        password: 'who',
        firstName: 'who',
        lastName: 'who'
    });

    await Users.create({
        email: 'qwe',
        password: 'qwe',
        firstName: 'Azaz',
        lastName: '??'
    });

    await Users.create({
        email: '123',
        password: '123',
        firstName: '??',
        lastName: '??'
    });

    await Conversations.create({
        firstUser: 1,
        secondUser: 2
    });


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
