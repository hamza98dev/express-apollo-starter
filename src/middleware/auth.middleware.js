const {isNull,get} =require('lodash')
const { verify} = require('jsonwebtoken')
 const auth = (req,res,next)=>{

    const header = req.get('Authorization')

    if (!header) {
        req.isAuth=false
        return next()
    }
    const token = header.split(' ')[1] //getting the token part
    if (isNull(token)) {
        req.isAuth=false
        return next()
    }

    let decoded = null;
    try{
        decoded =  verify(token,process.env.HASH)
    }catch(err){
        req.isAuth=false
        return next()
    }

    if (!decoded) {
        req.body.isAuth=false
        return next()
    }
    req.isAuth = true
    req.userId= get(decoded,'id',null)
    return next()
}
module.exports={
    auth
}