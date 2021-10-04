const app = require('express')();
const http = require('http');
const server = http.createServer(app);
const mongoose = require('mongoose');
const { Server } = require("socket.io");
const io = new Server(server);

app.use(function (req, res, nxt) {
    req.pick = function (obj, ...properties) {
        if (!obj || Object.keys(obj).length <= 0) {
            return {};
        }
        return properties.reduce((a, k) => {
            if (Object.prototype.hasOwnProperty.call(obj, k)) {
                a[k] = obj[k];
            }
            return a;
        }, {});
    };
    res.throw = function (code, obj) {
        res.status(code);
        if (typeof obj == 'string') {
            obj = {
                message: obj
            };
        }
        return res.json(obj);
    };
    nxt();
});

app.use(function (err, req, res, nxt) {
    return res.status(err.status || 500).json({
        error: err,
        message: 'Internal server error.'
    });
});

mongoose.connect(process.env.MONGODB || 'mongodb://localhost:27017/chat', { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) {
        console.error(err);
        throw err;
    }
    console.log('Database connected successfully.')
});


app.all('*', function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Allow-Methods', 'POST, GET, PUT,PATCH, DELETE,OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,authorization-key,token,x-token');
    if ('OPTIONS' === req.method) return res.status(200).send();
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/demo.html');
});
let onlineUsers = [];
io.on('connection', (socket) => {
    const name = socket.handshake.auth.name;

    onlineUsers.push({ [socket.id]: name });

    // Broadcast a message to connected users when someone connects or disconnects.
    socket.broadcast.emit('user connect', `${name} connected.`);

    socket.on('chat message', (msg) => {
        console.log(`Msg from client to server: ${msg}`)
        io.emit('chat message', msg)
    })
    console.log({ onlineUsers })
    //Show who’s online.
    io.emit('online status', onlineUsers)

    //Add “{user} is typing” functionality.
    socket.on('typing', (msg) => {
        console.log(msg)
        socket.broadcast.emit('typing', msg)
    })
    socket.on('typing_status', (msg) => {
        console.log(msg)
        socket.broadcast.emit('typing_status', msg)
    })

    // private chat event 
    socket.on('private chat', (data => {
        console.log('private chate event', data)
        // sender name
        data.senderInfo = {
            userid: socket.id,
            username: name
        }
        // send message to individual socketid (private message)
        io.to(data.receiverId).emit('private chat', data);
    }))

    socket.on('disconnect', () => {
        socket.broadcast.emit('user disconnect', `${name} disconnected.`)
        onlineUsers.pop(name);
        console.log(`${name} disconnected`);
    });
});

server.listen(process.env.PORT, BIND, () => {
    console.log(`listening on *:${BIND}:${process.env.PORT}`);
});