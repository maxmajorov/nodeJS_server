const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const users = require('./routers/users-router')
const mongoose = require('mongoose');


const port = process.env.PORT || 3010

process.on('unhandledRejection', (reason, p) => console.log(reason, p))

// connect to database
main().catch(err => console.log(err));

async function main() {
  let con = await mongoose.connect('mongodb://localhost:27017/first-db');
  console.log(con)
}

// create expres app
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// set routes
app.use('/users', users)

app.get('/tasks', async (request, response) => {
    response.send('tasks')
})


// default route
app.use((req, res) => res.send('Page not found'))



app.listen(port, () => {
    console.log(`Server is running at port ${port}...`);
})