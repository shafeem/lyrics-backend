const mongoose = require('mongoose');
const Role = require('./role');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: { 
        type: String,
        unique: true,
    },
    number:{
        type: Number,
    },
    type:{
        type:String,
        default: Role.user
    }
})

const User = mongoose.model("User",userSchema)

module.exports = User