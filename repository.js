const fs = require("fs");
const { readJSONFromFile } = require('../back_dev/utils/fs-read');
const { writeJSONToFile } = require('../back_dev/utils/fs-write');
const { User } = require('./schems/users-schema');

const getUsers = () => {
    return User.find()
}

const addUser = async (name) => {

    const newUser = await new User({name});
    return newUser.save();

}

exports.getUsers = getUsers
exports.addUser = addUser