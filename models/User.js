const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    githubId: String,
    password: String,
    name: String,
    email: { type: String, unique: true, sparse: true },
});

mongoose.model('users', userSchema);