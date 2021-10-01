// const app = require("express")();
// const { createServer } = require("http");
// const { Server } = require("socket.io");

// const httpServer = createServer(app);
// const io = new Server(httpServer, { /* options */ });

// io.on("connection", (socket) => {
//   console.log('hlroo')
// });

// httpServer.listen(4200);

const app = require('express')();
const http = require('http');
const { connected } = require('process');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/demo.html');
});
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
  socket.on('disconnect', () => {
    socket.broadcast.emit('user disconnect', `${name} disconnected.`)
    onlineUsers.pop(name);
    console.log(`${name} disconnected`);
  });
});

server.listen(4500, () => {
  console.log('listening on *:4500');
});