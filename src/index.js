const express = require('express');
const path = require('path')
const socket_io = require('socket.io');
const http = require('http')

const app = express();
const server = http.createServer(app);
const io = socket_io(server);

// config public directory
const publicPath = path.join( __dirname, '../public');
app.use(express.static(publicPath));
// get port server
const port = process.env.PORT || 3000

io.on('connection', (socket) => {
    console.log('New websocket connection!');
    socket.emit('message','welcome!');
    socket.broadcast.emit('message','A new user has joined!');
    socket.on('send_massage', (data) => {
        io.emit('message',data)
    })
    socket.on('share_location', (position) => {
        socket.broadcast.emit('message',`https://google.com/maps?q=${position.latitude},${position.longitude}`);
    })
    socket.on('disconnect', () => {
        io.emit('message','A user has left!')
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})