const {
    fileAPI,
    photoAPI,
    uploadFile,
    uploadPhoto
} = require('../httpServices/fileProcessing');

function Router(fastify, opts, done){
    fastify.get('/', (req, reply) => {
        return reply.sendFile('/index.html');
    });

    fastify.post('/file', {preHandler: fileAPI.single('file')}, uploadFile);
    fastify.post('/photo', {preHandler: photoAPI.single('file')}, uploadPhoto);

    done();
}

module.exports = Router;