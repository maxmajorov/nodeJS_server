const http = require('http');
const { usersController } = require('./usersController');
// const express = require('express')
// const cors = require('cors')

const port = process.env.PORT || 3010

process.on('unhandledRejection', (reason, p) => console.log(reason, p))

// const app = express()
// app.use(cors()) // не работает???

const cors = (response, request) => {
    // Set CORS headers
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Request-Method', '*');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    response.setHeader('Access-Control-Allow-Headers', '*');
    if (request.method === 'OPTIONS') {
        request.writeHead(200);
        response.end();
        return rtue;
    }
    return false
}


const requestHandler = (request, response) => {

    if (cors(response, request)) return

    switch (request.url) {
        case '/':
            response.write(`Hello! It's my first server on nodeJS!`)
            break;
        case '/users':
            usersController(request, response)
            break;
        case '/lessons':
            response.write('USERS LIST')
            response.end()
            break;
        default:
            response.write('PAGE NOT FOUND')
            response.end()
    }
}

const server = http.createServer(requestHandler)

server.listen(port, () => {
    console.log(`Server is running at port ${port}...`);
})