const fs = require("fs");
const { readJSONFromFile } = require('../back_dev/utils/fs-read');
const { writeJSONToFile } = require('../back_dev/utils/fs-write');

const getUsers = () => {

    return readJSONFromFile("db/users.json")
}

const addUser = async (name) => {
    let users = await getUsers()
    users.push({ id: Math.random() * 100, name: name })

    return writeJSONToFile("db/users.json", users)
}

exports.getUsers = getUsers
exports.addUser = addUser