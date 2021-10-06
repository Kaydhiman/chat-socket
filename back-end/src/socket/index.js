const socket = require('socket.io');
let io;
module.exports = (app) => {
    if (io) {
        return io;
    }
    // @ts-ignore
    io = socket(app.server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            allowedHeaders: [],
            credentials: false,
        },
    });
    return io;
}