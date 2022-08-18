
const { getUsers, addUser } = require('./repository');

const usersController = async (request, response) => {
    console.log('im here')

    if (request.method === 'POST') {
        console.log('im here POST')
        addUser('Dasha')
        response.write(JSON.stringify({ success: true }))
        response.end
    } else {
        let users = await getUsers()
        console.log(users)
        response.write(JSON.stringify([{ id: 1, name: 'Max' }]))
        response.end
    }
}

exports.usersController = usersController




