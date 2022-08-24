const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    position: String,
    locations: [
      {
        country: String,
        city: String
      }
    ],
    friends: [
      {
        name: String,
        age: Number
      }
    ]
  });

const User = mongoose.model('users', userSchema);

exports.User = User