const users = [];

const addUser = ({ id, username, room}) => {
    // clean data
    const _username = username.trim().toLowerCase();
    const _room = room.trim().toLowerCase();
    // validate data
    if( !_username || !_room ){
        return {
            error: 'Username or room are require!'
        }
    }
    // check for existing user
    const existingUser = users.find((user)=>{
        return user.username === _username && user.room === _room;
    })
    // validate username
    if ( existingUser ){
        return {
            error: 'Username is in use!'
        }
    }
    // Store user
    const user = {
        id,
        username: _username,
        room: _room
    }
    users.push(user);
    return user;
}

const removeUser = (id) => {
    const index = users.findIndex((user) => {
        return user.id === id
    })
    if(index !== -1){
        return users.splice(index,1)[0];
    }
    return;
}

const getUser = (id) => {
    return users.find((user) => user.id === id );
}

const getUsersInRoom = (room) => {
    const _room = room.trim().toLowerCase();
    return users.filter((user) => user.room === _room )
}

addUser({
    id: 1,
    username: "test1",
    room: "admin"
});
addUser({
    id: 2,
    username: "test2",
    room: "user admin"
});
addUser({
    id: 3,
    username: "test3",
    room: "admin"
});

const user = getUsersInRoom(' user admin')

console.log(user);

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}