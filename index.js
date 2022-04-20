const {auth} = require("./src/middleware/auth.middleware");
const {resolvers,typeDefs} = require('./src/graphql/index')

const express= require('express')
require('dotenv').config()
const app = express()

const mongoose = require('mongoose')

const {ApolloServer} =require('apollo-server-express')


const dbName = process.env.DB_NAME
const dbUrl = process.env.DB_URL
const port = process.env.PORT

mongoose.connect(dbUrl.concat(dbName), async () => {
    try {
        console.log('🎆 Db connected ')
        /*Init GraphQl Route*/

        app.use(auth)
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            playground: false,
            context:({req})=>{
                return req
            }
        })
        await server.start()
        server.applyMiddleware({ app })


        /*Starting Server */
        app.listen(port , () =>
            console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
        )
    }catch (e) {
        console.log(e)
    }

})