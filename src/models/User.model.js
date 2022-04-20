const mongoose = require('mongoose')

const UserModel = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min: [6, 'password must be at least 6 characters'],
    }
},{
    timestamps:true
})
const User  = mongoose.model('User',UserModel)
module.exports = {
    User
}