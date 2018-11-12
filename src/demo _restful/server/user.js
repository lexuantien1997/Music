const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username:  {
    type: String,
    require: true  
  },
  password:  {
    type: String,
    require: true
  }
},{collection: 'user'});

const User =  mongoose.model('user',UserSchema);
module.exports = User;