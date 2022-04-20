let {registerValidation} = require('../../validations/register.validation')
let bcrypt = require('bcryptjs');

const {User} = require('../../models/User.model')
const Query = {
    me:()=>{
        //Return connected user
    }
}
const Mutation = {
    login:(parent,_args)=>{
        //Login function here
    },
    register:async (parent, {data})=>{
    try{
    //Register function here
    }catch (e) {
        throw e
    }
    },
}

module.exports = {
    Query,
    Mutation
}