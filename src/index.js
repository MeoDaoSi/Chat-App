const express = require('express');
const path = require('path');
const { Server } = require('socket.io');
const http = require('http');
const Filter = require('bad-words');
const { messGenerate, locationMessGenerate } = require('./utils/message');
const {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
} = require('./utils/users')

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
    
    socket.on('join',(options,callback) => {
        const {error, user} = addUser({
            id: socket.id,
            ...options
        })
        if(error){
            return callback(error);
        }
        console.log(user.room);
        socket.join(user.room);
        socket.emit('message',messGenerate('Admin','welcome!'));
        socket.broadcast.to(user.room).emit('message',messGenerate(`${user.username} has joined!`));
        callback();
    })
    socket.on('send_massage', (data,callback) => {
        const user = getUser(socket.id);
        if(!user){
            return;
        }
        const filter = new Filter;
        if(filter.isProfane(data)){
            return callback(true)
        }
        io.to(user.room).emit('message',messGenerate(user.username,data));
        callback();
    })
    socket.on('share_location', (position,callback) => {
        const user = getUser(socket.id);
        if(!user){
            return;
        }
        io.to(user.room).emit('location_render',locationMessGenerate(user.username,`https://google.com/maps?q=${position.latitude},${position.longitude}`));
        callback();
    })
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if(user){
            io.to(user.room).emit('message',messGenerate('Admin',`${user.username} has left!`));
        }
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})