const { User } = require('./schems/users-schema');

const getUsers = (search) => {
 
    if (!search) {
        return User.find()
    } else {
        return User.find({name : new RegExp(search)})
    }
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
exports.addUser = addUser
exports.removeUser = removeUser