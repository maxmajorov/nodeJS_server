const users = [
    { id: 1, name: "Olga" },
    { id: 2, name: "Pavel" },
    { id: 3, name: "Karina" },
]

const getUsers = () => {
    return users
}

const addUser = (name) => {
    users.push({ id: 4, name })
}

exports.getUsers = getUsers
exports.addUser = addUser