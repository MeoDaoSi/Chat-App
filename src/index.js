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

let count = 0;

io.on('connection', (socket) => {
    console.log('New websocket connection!');
    socket.emit('countUpdate',count);
    socket.on('increment',() => {
        count++;
        io.emit('countUpdate',count);
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})