const fs = require("fs");

// const users = [
//     { id: 1, name: "Olga" },
//     { id: 2, name: "Pavel" },
//     { id: 3, name: "Karina" },
// ]


const getUsers = () => {
    return new Promise((res, rej) => {
        fs.readFile("db/users.json", function (err, buf) {
            // res(JSON.parse(buf));
            res(buf.toString())
        });
    })
}

const addUser = (name) => {
    users.push({ id: 4, name })
}

exports.getUsers = getUsers
exports.addUser = addUser