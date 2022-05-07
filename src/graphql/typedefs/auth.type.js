const { gql} =require('apollo-server-express')
const {Query,Mutation} = require('../resolvers/auth.resolver')
const authSchema =gql`
    type user {
        id:ID!
        fullname:String!
        email:String!
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
        fullname:String
        email:String
        password:String
    }

    type Query {
        me(token:String):user
    }
    type Mutation {
        googleAuth(idToken: String):user
        login(data:loginCredentials):token
        register(data:registerCredentials):user
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