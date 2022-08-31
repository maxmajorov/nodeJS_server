const express = require('express')
const http = require('http');
const cors = require('cors')
const router = express.Router()
const { Server } = require("socket.io");

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

let usersState = new Map()
const messages = []

app.get('/chat', async (request, response) => {
    response.send('chat messages')
})

// socket 
io.on('connection', (chatSocket) => {
    console.log('a user connected');

    usersState.set(chatSocket, { _id: new Date().getTime().toString(), name: 'anonimus' })

    // SET-CLIENT-NAME
    chatSocket.on('client-set-name', (name) => {
        const newUser =  usersState.get(chatSocket)
        newUser.name = name
        io.emit('send-userInfo-to-client', newUser)
    });
    
    // SEND-CLIENT-MESSAGE
    chatSocket.on('client-message-send', (message) => {
        if (typeof message !== 'string' || message.length > 50) {
            return 'Message should be less than 50 chars'
        }

        const user = usersState.get(chatSocket)

        let newMessageItem =  { _id: new Date().getTime(), message: message, user: { _id: user._id, name:user.name }}   
        messages.push(newMessageItem)

        io.emit('new-message-send', newMessageItem)
    })

    // TYPING-TEXT
      chatSocket.on('client-typing-text', () => {
        io.emit('user-typing-text', usersState.get(chatSocket))
    });
    
    // Send messages to client
    chatSocket.emit('init-message-published', messages);
  
    // disconnect
    io.on('disconnect', () => {
        console.log('disconnected');
        usersState.delete(chatSocket)
    });
});  

server.listen(port, () => console.log('connect with WS success'))
  
module.exports = router

