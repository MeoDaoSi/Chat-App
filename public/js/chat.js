const socket = io();
socket.on('message', (message) => {
    console.log(message);
})

document.querySelector('#message_input').addEventListener('submit', (e) => {
    const data = document.querySelector('.message').value;
    e.preventDefault();
    socket.emit('send_massage',data);
})

document.querySelector('#share_location').addEventListener('click', () => {
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser!')
    }
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('share_location',{longitude: position.coords.longitude, latitude: position.coords.latitude});
    });
})