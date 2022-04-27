let {User} = require('../models/User.model')

const loginValidation=  async({ email, password })=> {
    // let errors = true
    // Validate emil & password
    if (!email || !password) {
        throw new Error('Please enter a email and password', 400);
    }

    const user = await User.findOne({ email }).select('+password'); // Check for user
    const isMatch = await user.matchPassword(password); // Check if password matches
    if (!user || !isMatch) {
        throw new Error('Invalid credentials', 401);
    }

    return user
}

module.exports = {
    loginValidation
}