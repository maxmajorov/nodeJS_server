const express = require('express')
const router = express.Router()
const { getUsers, getUser, updateUser, addUser, removeUser } = require('../repository');


// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})
// define the home page route
router.get('/', async (request, response) => {
    let users = await getUsers(request.query.search)
    response.send(users)

})

// Get user by ID
router.get('/:id', async (request, response) => {
    const userID = request.params.id
 
    let user = await getUser(userID)

    user
        ? response.send(user)
        : response.send(404)

})

router.put('/:id', async (request, response) => {
    const userID = request.params.id
 
    let user = await updateUser(userID, request.body.name, request.body.age)

    // user.save()
    user
        ? response.send(user)
        : response.send(404)

})

router.post('/', async (request, response) => {
    await addUser(request.body)
    response.send({ success: true })

})

router.delete('/:id', async (request, response) => { 
    await removeUser(request.params.id)
    response.send({ success: true })
})

module.exports = router





