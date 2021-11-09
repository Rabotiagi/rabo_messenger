const { getLogin, postLogin } = require('../controllers/login.js');
const { getReg, postReg } = require('../controllers/registration.js');

function Router(fastify, options, done){
    fastify.get('/', (req, reply) => {
        reply.redirect('/login');
    });

    fastify.get('/chat', (req, reply) => {
        reply.redirect('http://localhost:3001/');
    });

    fastify.get('/login', getLogin);

    fastify.get('/registration', getReg);

    fastify.post('/login', postLogin);

    fastify.post('/registration', postReg);

    done();
}

module.exports = Router;