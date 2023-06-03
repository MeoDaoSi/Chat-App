const socket = io();

// Element
const messageForm = document.querySelector('#message_input');
const messageFormInput = messageForm.querySelector('.message');
const messageFormButton = messageForm.querySelector('button');
const shareFormButton = document.querySelector('#share_location');

socket.on('message', (message) => {
    console.log(message);
})

messageForm.addEventListener('submit', (e) => {
    // disable form button
    messageFormButton.setAttribute('disabled','disabled');
    const message = messageFormInput.value;
    e.preventDefault();
    socket.emit('send_massage',message, (error) => {
        // enable form button
        messageFormButton.removeAttribute('disabled','disabled');
        messageFormInput.value = '';
        messageFormInput.focus();
        if(error){
            return console.log('A message not valid!');
        }
        console.log('The message was delivered!');
    });
})

shareFormButton.addEventListener('click', () => {
    shareFormButton.setAttribute('disabled','disabled');
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser!')
    }
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit(
            'share_location',
            {longitude: position.coords.longitude, latitude: position.coords.latitude},
            () => {
                shareFormButton.removeAttribute('disabled','disabled');
                console.log('Location Shared!');
            }
        );
    });
})