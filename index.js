const express = require('express')
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors')
const users = require('./routers/users-router')
const mongoose = require('mongoose');
const { Server } = require("socket.io");

const port = process.env.PORT || 3010

process.on('unhandledRejection', (reason, p) => console.log(reason, p))

// connect to database
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/first-db');
}

// create expres app
const app = express()
// create server
const server = http.createServer(app);
const io = new Server(server);


app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// set routes
app.use('/users', users)

app.get('/chat', async (request, response) => {
  response.send('Hello, WS Server')
})

app.get('/tasks', async (request, response) => {
    response.send('tasks')
})


// default route
app.use((req, res) => res.send('Page not found'))


// socket 
io.on('connection', (socket) => {
  console.log('a user connected');
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}...`);
})