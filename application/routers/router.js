const getIndex = require('../services/index.js');
const { getLogin, postLogin } = require('../services/login.js');
const { getReg, postReg } = require('../services/registration.js');

function Router(fastify, options, done){
    fastify.get('/', getLogin);

    fastify.get('/chat', getIndex);

    fastify.get('/login', getLogin);
    fastify.post('/login', postLogin);

    fastify.get('/registration', getReg);
    fastify.post('/registration', postReg);

    done();
}

module.exports = Router;