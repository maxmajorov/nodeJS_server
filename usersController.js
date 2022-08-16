
const { getUsers, addUser } = require('./repository');

const usersController = async (request, response) => {
    console.log('im here')
    if (request.method === 'POST') {
        addUser('Dasha')
        response.write(JSON.stringify({ success: true }))
        response.end
    } else {
        let users = await getUsers()
        console.log(users)
        response.write([{ id: 1, name: "max" }])
        response.end
    }
}

exports.usersController = usersController




