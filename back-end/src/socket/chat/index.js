module.exports = (io) => {

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
}