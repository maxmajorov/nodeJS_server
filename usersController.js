const { getUsers, addUser } = require('./repository');

const GET = 'GET'
const POST = 'POST'
const PUT = 'PUT'
const DELETE = 'DELETE'

const usersController = async (request, response) => {

    switch (request.method) {
        case POST: {
            addUser('Dasha')
            response.write(JSON.stringify({ success: true }))
            response.end()
            break
        }
        case GET: {
            let users = await getUsers()
            response.write(JSON.stringify(users))
            response.end()
            break
        }
        default:
            response.write('PAGE NOT FOUND')
    }
}

exports.usersController = usersController




