const express = require('express')
const http = require('http');
const cors = require('cors')
const router = express.Router()
const { Server } = require("socket.io");
const { Socket } = require('dgram');

const port = process.env.PORT || 3009

const app = express()
app.use(cors())

// create server
const server = http.createServer(app);
const io = new Server(server, {
    path: "/chat/",
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
  });

app.get('/chat', async (request, response) => {
    response.send('Hello, WS Server')
})

// socket 
io.on('connection', (chatSocket) => {
    console.log('a user connected');
    
    chatSocket.on('client-message-send', (message) => {
         console.log( message);
    })
    // send message all connected users
    chatSocket.emit('hello', 'Привет')
    // disconnect
    chatSocket.on('disconnect', () => {
        console.log('disconnected');
    });
});  

// io.on('client-message-send', (message) => {
  
// }); 

server.listen(port, () => console.log('connect with WS success'))
  

module.exports = router

