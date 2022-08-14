// const express = require('express')
const http = require('http')
// const cors = require('cors')
const port = process.env.PORT || 3010

// const app = express()

// app.use(cors()) // не работает???

const users = [
    { id: 1, name: "Olga" },
    { id: 2, name: "Pavel" },
    { id: 3, name: "Karina" },
]

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
            response.write(`{ "id": "1", "user": "Maxim" }`)
            break;
        case '/users':
            response.write(JSON.stringify(users))
            break;
        case '/lessons':
            response.write('USERS LIST')
            break;
        default:
            response.write('PAGE NOT FOUND')
    }
    response.end()
}

const server = http.createServer(requestHandler)

server.listen(port)