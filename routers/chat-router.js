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

let users = new Map()
const messages = []


 


app.get('/chat', async (request, response) => {
    response.send('chat messages')
})

// socket 
io.on('connection', (chatSocket) => {
    console.log('a user connected');

    users.set(chatSocket, { _id: new Date().getTime().toString(), name: 'anon' })

    chatSocket.on('set-new-user', (name) => {
        const newUser =  users.get(chatSocket)
        newUser.name = name
    });
    
    chatSocket.on('client-message-send', (message) => {
        if (typeof message !== 'string') {
            return 
        }

        const newItem =  { _id: new Date().getTime(), message: message, user: { _id: user._id, name:user.name }}   
        messages.push(newItem)

        io.emit('new-message-send', newItem)
    })
    // Send messages to client
    chatSocket.emit('init-message-published', messages);
  

    // send message all connected users
    chatSocket.emit('greeting', 'Hello')
    // disconnect
    chatSocket.on('disconnect', () => {
        console.log('disconnected');
    });
});  



// io.on('client-message-send', (message) => {
  
// }); 

server.listen(port, () => console.log('connect with WS success'))
  

module.exports = router

