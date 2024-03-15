const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true,
        default: 'default.jpg'
    },
    posts: {
        type: Number,
        default: 0
    }
})

const User = model('User', userSchema)

module.exports = User