import "reflect-metadata";

import 'dotenv/config'
// import {createConnection} from "typeorm";
// import {User} from "./entity/User";

import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'

import * as express from 'express'
import * as session from 'express-session'

import { createConnection } from 'typeorm';
import cors = require('cors');
import { stripe } from "./stripe";

const startServer = async () => {
    const server = new ApolloServer({
      // These will be defined for both new or existing servers
      typeDefs,
      resolvers,
      context: ({ req }) => ({ req })
    });

    await createConnection();
    
    const app = express();

    app.use(session({
        saveUninitialized: false,
        resave: false,
        secret: '1111111a'
    }))

    // var corsOptions = {
    //     origin: 'localhost:3000/',
    //     credentials: false // <-- REQUIRED backend setting
    //   };
    // app.use(cors(corsOptions));

    server.applyMiddleware({ app, cors : {
        credentials: true,
        origin : 'http://localhost:3000'
    } }); // app is from an existing express app
    
    app.listen({ port: 4000 }, () =>
      console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    )    
}

startServer();