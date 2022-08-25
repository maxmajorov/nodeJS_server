const express = require('express')
const http = require('http');
const router = express.Router()
const { Server } = require("socket.io");


const app = express()

// create server
const server = http.createServer(app);
const io = new Server(server, {
    path: "/chat"
  });

router.get('/', async (request, response) => {
    console.log('WS connected')
    response.send('Hello, WS Server')
})

// socket 
io.on('connection', (socket) => {
    console.log('a user connected');
    // send message all connected users
    io.emit('hello', 'Привет')
    // disconnect
    io.on('disconnect', () => {
        console.log('disconnected');
    });
  });  


module.exports = router

