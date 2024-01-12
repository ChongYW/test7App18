const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  // Other user fields
});

userSchema.plugin(passportLocalMongoose, { usernameField : 'email' });

const User = mongoose.model('User', userSchema);

module.exports = User;
