const config = require('dotenv').config();

if(config.error){
    throw config.error;
}

const Users = require('./database/models/users.js');
const Chats = require('./database/models/chats.js');
const Messages = require('./database/models/messages.js');
const app = require('fastify')({logger: true});
const fastifyStatic = require('fastify-static');
const chatServer = require('./chat/chatServer.js');
const path = require('path');
const seq = require('./database/connection.js');
const Router = require('./routers/router.js');
const UsersRepo = require('./database/repository/usersRepo.js');
const ChatRepo = require('./database/repository/chatRepo.js');

app.register(Router);

app.register(fastifyStatic, {
    root: path.resolve(__dirname, '../application')
});

(async () => {
    Chats.hasMany(Messages, {
        foreignKey: 'fromConv',
        sourceKey: 'chat_id'
    });
    
    Messages.belongsTo(Chats, {
        foreignKey: 'fromConv',
        targetKey: 'chat_id'
    });
    
    Users.hasMany(Messages, {
        foreignKey: 'sender',
        sourceKey: 'id'
    });

    Messages.belongsTo(Users, {
        foreignKey: 'sender',
        targetKey: 'id'
    });
    
    await seq.sync();

    // await Users.create({
    //     email: '123',
    //     password: '123',
    //     firstName: '1',
    //     lastName: '1'
    // });

    // await Users.create({
    //     email: 'qwe',
    //     password: 'qwe',
    //     firstName: '2',
    //     lastName: '2'
    // });

    // await Chats.create({
    //     users: [1,2]
    // });

    // await Messages.create({
    //     fromConv: 1,
    //     msg: 'NY KAK YARIK, TEPER PONIATNO STALO??)))',
    //     sender: 1
    // });

    const res = [];
    const users = await UsersRepo.getAllUsers(1);

    for(let i = 0; i < users.length; i++){
        const user = users[i];
        const chat = await ChatRepo.getConversation([1, 2])

        res.push({name: user.firstName, chat: chat.chat_id });
    }

    console.log(res);

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
