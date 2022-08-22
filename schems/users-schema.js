const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    age: String,
    locations: Array
  });

const User = mongoose.model('users', userSchema);

exports.User = User