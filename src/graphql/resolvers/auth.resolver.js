let {registerValidation} = require('../../validations/register.validation')
let {loginValidation} = require('../../validations/login.validation')

const jwt = require('jsonwebtoken');
const {User} = require('../../models/User.model');

const Query = {
    me:async (parent, {token})=>{
        //Return connected user
        return jwt.verify(token, process.env.JWT_SECRET, async (err, {id}) => {
            if(id) {
                let user = await User.findById(id)
                return user
            }
        })
    }
}
const Mutation = {
    login:async (parent,{data})=>{
        //Login function here
        let user = await loginValidation(data)
        return sendToken(user)
    },
    register:async (parent, {data})=>{
        //Register function here
        await registerValidation(data)
        let user = await User.create(data)
        return user
    },
}

// Get token from model
const sendToken = (user) => {
    // Create token
    const token = user.getSignedJwtToken();
    const expires = (Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000).toString()

    return {
        accessToken: token,
        refreshToken: "",
        accessTokenExpiresIn: "3600",
        refreshTokenExpiresIn: "",
    }
};

module.exports = {
    Query,
    Mutation
}