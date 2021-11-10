const { getIndex, postIndex } = require('../controllers/index.js');
const { getLogin, postLogin } = require('../controllers/login.js');
const { getReg, postReg } = require('../controllers/registration.js');

function Router(fastify, options, done){
    fastify.get('/', getIndex);
    fastify.post('/', postIndex);

    fastify.get('/chat', getIndex);
    fastify.post('/chat', postIndex);

    fastify.get('/login', getLogin);
    fastify.post('/login', postLogin);

    fastify.get('/registration', getReg);
    fastify.post('/registration', postReg);

    done();
}

module.exports = Router;