const { gql} =require('apollo-server-express')
const {Query,Mutation} = require('../resolvers/auth.resolver')
const authSchema =gql`
    type user {
        id:ID!
        username:String!
        email:String!
        password:String
        createdAt:String
        updatedAt:String
    }

    type token {
        accessToken:String
        refreshToken:String
        accessTokenExpiresIn:String
        refreshTokenExpiresIn:String
    }



    #inputs
    input loginCredentials{
        email:String
        password:String
    }

    input registerCredentials{
        username:String
        email:String
        password:String
    }

    input emailCheckCredentials{
        email:String
    }

    type Query {
        me(token:String):user
    }
    type Mutation {
        login(data:loginCredentials):token
        register(data:registerCredentials):user
        checkEmail(data:emailCheckCredentials):Boolean
    }
`
const authResolver = {
    Query,
    Mutation
}

module.exports={
    authResolver,
    authSchema
}