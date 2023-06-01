const socket = io();
socket.on('countUpdate', (count) => {
    console.log('count update',count);  
})
document.querySelector('#increment').addEventListener('click', () => {
    socket.emit('increment');
})