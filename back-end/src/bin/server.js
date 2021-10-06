const app = require('express')();
const http = require('http');
// old implementation
// const server = http.createServer(app);
const mongoose = require('mongoose');
// old implementation
// const { Server } = require("socket.io");
// const io = new Server(server);

app.server = http.createServer(app);
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

server.listen(process.env.PORT, BIND, () => {
    console.log(`listening on *:${BIND}:${process.env.PORT}`);
});
module.exports = {
    io,
    app
}