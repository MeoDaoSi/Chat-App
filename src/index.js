const express = require('express');
const path = require('path');
const { Server } = require('socket.io');
const http = require('http');
const Filter = require('bad-words');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// config public directory
const publicPath = path.join( __dirname, '../public');
app.use(express.static(publicPath));
// get port server
const port = process.env.PORT || 3000

io.on('connection', (socket) => {
    console.log('New websocket connection!');
    socket.emit('message','welcome!');
    socket.broadcast.emit('message','A new user has joined!');
    socket.on('send_massage', (data,callback) => {
        const filter = new Filter;
        if(filter.isProfane(data)){
            return callback(true)
        }
        io.emit('message',data);
        callback();
    })
    socket.on('share_location', (position,callback) => {
        socket.broadcast.emit('message',`https://google.com/maps?q=${position.latitude},${position.longitude}`);
        callback();
    })
    socket.on('disconnect', () => {
        io.emit('message','A user has left!')
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})