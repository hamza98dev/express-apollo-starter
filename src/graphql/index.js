const auth = require('./typedefs/auth.type')
const { makeExecutableSchema } =require('@graphql-tools/schema');


const typeDefs=[
    auth.authSchema
]
const resolvers=[
    auth.authResolver
]

module.exports={
    typeDefs,
    resolvers
}