let {registerValidation} = require('../../validations/register.validation')
let {loginValidation} = require('../../validations/login.validation')

// Google auth
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

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
    googleAuth: async (_,{ idToken }) => {
        const clientId = process.env.GOOGLE_CLIENT_ID
        const { payload } = await client.verifyIdToken({idToken: idToken, audience: clientId})
        
        // 
        if(payload.email_verified) {
            const user = await User.findOne({email: payload.email});
            
            if(!user) {
                const newUser = new User({
                    fullname: payload.name,
                    email: payload.email
                });
                await newUser.save();
                return newUser
            }
            return user
        }

        throw new Error('Login Unsuccessfull');

    },
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
    checkEmail:async (_, { email })=>{
        //Register function here
        let user = await User.count({email: email})
        return user > 0 
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