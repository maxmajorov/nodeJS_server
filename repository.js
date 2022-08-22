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

const removeUser = async (id) => {
    console.log(id)
    const user = await User.deleteOne({id});
    // return user.save();
}

exports.getUsers = getUsers
exports.addUser = addUser
exports.removeUser = removeUser