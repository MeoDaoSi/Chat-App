const express = require('express');
const path = require('path');
const { Server } = require('socket.io');
const http = require('http');
const Filter = require('bad-words');
const { messGenerate, locationMessGenerate } = require('../public/utils/message');

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
    
    socket.on('join',({username, room}) => {
        socket.join(room);
        socket.emit('message',messGenerate('welcome!'));
        socket.broadcast.to(room).emit('message',messGenerate(`${username} has joined!`));
    })
    socket.on('send_massage', (data,callback) => {
        const filter = new Filter;
        if(filter.isProfane(data)){
            return callback(true)
        }
        io.emit('message',messGenerate(data));
        callback();
    })
    socket.on('share_location', (position,callback) => {
        io.emit('location_render',locationMessGenerate(`https://google.com/maps?q=${position.latitude},${position.longitude}`));
        callback();
    })
    socket.on('disconnect', () => {
        io.emit('message',messGenerate('A user has left!'))
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})