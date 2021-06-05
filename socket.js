const socketIO = require("socket.io");
let io;

//creates a new socket.io instance if one does not already exist,
module.exports = (server) => {
    if(server && !io){
        io = socketIO(server);
    }
    return io;
}