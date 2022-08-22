const express = require('express')
const router = express.Router()
const { getUsers, addUser } = require('../repository');


// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})
// define the home page route
router.get('/', async (request, response) => {
    let users = await getUsers()

    if (!!request.query.search) {
        users = users.filter(u => u.name.indexOf(request.query.search) > -1)
    }

    response.send(users)

})

// Get user by ID
router.get('/:id', async (request, response) => {
    const userID = request.params.id

    let users = await getUsers()
    let user = users.find(u => u.id == userID)
    console.log(userID, users)
    user
        ? response.send(user)
        : response.send(404)

})

router.post('/', async (request, response) => {
    console.log(request.body)
    await addUser(request.body.name)
    response.send({ success: true })

})

module.exports = router





