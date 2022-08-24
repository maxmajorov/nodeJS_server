const { User } = require('./schems/users-schema');

const getUsers = (search) => {
 
    if (!search) {
        return User.find()
    } else {
        return User.find({name : new RegExp(search)})
    }
}

const getUser = (id) => {
    console.log(' BACK ', id)
    return User.findOne({_id: id})
}

const addUser = async (name, age) => {
    const newUser = await new User(
        {
            name,
            age 
        });
    return newUser.save();
}

const removeUser = async (id) => {
    const user = await User.deleteOne({_id: id});
}

exports.getUsers = getUsers
exports.getUser = getUser
exports.addUser = addUser
exports.removeUser = removeUser