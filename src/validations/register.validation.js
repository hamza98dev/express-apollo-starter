let validator = require('validator');
let {User} = require('../models/User.model')
const registerValidation=  async(inputs)=> {
    if (!validator.isEmail(inputs.email)) throw new Error('Please enter a valid mail')
    let emailExist = await User.find({email: inputs.email},(err,doc)=>{
        return doc
    }).clone()
/*    let usernameExist = await User.find({username: inputs.username},(err,doc)=>{
        return doc
    }).clone()*/
    if (emailExist) throw new Error('this email already exist')
/*
    if (usernameExist) throw new Error('username already exist')
*/
    if (!validator.isStrongPassword(inputs.password,{ minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0})) throw new Error('Password must contain at least 6 characters , 1 lowercase ,1 uppercase and 1 number')
}
module.exports = {
    registerValidation
}