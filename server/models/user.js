const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
})

userSchema.methods.hashPassword = function () {
    console.log(this.password);
    const hash = bcrypt.hashSync(this.password, 10);
    console.log(hash);
    return hash;
};

module.exports = mongoose.model('User', userSchema);