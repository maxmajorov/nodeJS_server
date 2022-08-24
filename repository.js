const { User } = require('./schems/users-schema');

const getUsers = (search) => {
 
    if (!search) {
        return User.find()
    } else {
        return User.find({name : new RegExp(search)})
    }
}

const getUser = (id) => {
    return User.findOne({_id: id})
}

const updateUser = (id, name, age) => {
  
    const user = getUser(id)
    return user.updateOne({name, age})
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
exports.updateUser = updateUser
exports.addUser = addUser
exports.removeUser = removeUser