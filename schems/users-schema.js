const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: String,
    phone: String,
    email: String,
    position: String,
    country: String,
    city: String,
    street: String,
    friends: [
      {
        name: String,
        age: Number
      }
    ]
  });

const User = mongoose.model('users', userSchema);

exports.User = User