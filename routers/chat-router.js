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

const messages = [
    { _id: 1, message: "Hello", user: { id: 1, name: "Max" } },
    { _id: 2, message: "Hi, Max!", user: { id: 2, name: "Olga" } },
  ]


app.get('/chat', async (request, response) => {
    response.send('chat messages')
})

// socket 
io.on('connection', (chatSocket) => {
    console.log('a user connected');
    
    chatSocket.on('client-message-send', (message) => {
        const newItem =  { _id: new Date().getTime(), message: message, user: { id: 2, name: "Olga" }}   
        messages.push(newItem)

        io.emit('new-mess-send', newItem)
    })
    // Send messages to client
    chatSocket.emit('init-message-published', messages);
  

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

