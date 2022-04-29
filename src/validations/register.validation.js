let validator = require('validator');
let {User} = require('../models/User.model')
const registerValidation=  async({username, email, password})=> {
    let errors = []
    // ______________ username ______________ //
    if (!username)
        errors.push('Please enter a username');
    else {
        let usernameExist = await User.find({username: username})
        if (usernameExist) 
            errors.push('This username already exist')
    }

    // ______________ email ______________ //
    if (!email)
        errors.push('Please enter a email');
    else if (!validator.isEmail(email)) 
        errors.push('Please enter a valid mail')
    else {
        let emailExist = await User.find({email: email})
        if (emailExist) 
            errors.push('This email already exist')
    }
    // ______________ password ______________ //
    // || !email || !password
    if (!email)
        errors.push('Please enter a password');
    else if (!validator.isStrongPassword(password,{ minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0}) ) 
        errors.push('Password must contain at least 6 characters , 1 lowercase ,1 uppercase and 1 number')
    
    
    if(errors.length > 0)
        throw new Error(errors.join('//'))

}
module.exports = {
    registerValidation
}