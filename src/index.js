import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';

import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from "express";
import mongoose from "mongoose";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import schemaDirectives from "./directives";
import session from "express-session";
import { AuthenticateRequest } from "./middlewares/authenticate";
import config from './config';
require("dotenv").config();

const MongoStore = require('connect-mongodb-session')(session)


const app = express();
const corsOptions = {
  origin: `*`,
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'OPTIONS'],
};
app.use(cors(corsOptions));

(async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL_WITH_DB_NAME,
      { useNewUrlParser: true }
    ).then(() => {
      console.log('Connected to MongoDB')
    }).catch(err => console.log(err));

    app.disable("x-powered-by");


    const store = new MongoStore({
      uri: process.env.MONGO_BASE_URL,
      databaseName: 'cnt-erp',
      collection: 'team-api-session',
    })

    app.use(
      session({
        store,
        name: process.env.SESS_NAME,
        secret: process.env.SESS_SECRET,
        resave: true,
        rolling: true,
        saveUninitialized: false,
        cookie: {
          masAge: parseInt(process.env.SESS_LIFETIME),
          sameSite: false,
          secure: true
        }
      })
    );

    const corsOptions = {
      origin: `*`,
      credentials: true,
      //methods: ['GET', 'PUT', 'POST', 'OPTIONS'],
    };
    app.use(cors(corsOptions));

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      schemaDirectives,
      playground: true,
      fetchOptions: {
        credentials: "include",
      },
      plugins: [
        ApolloServerPluginLandingPageLocalDefault(),
      ],
      context: ({ req, res }) => {
        const token = req.headers.authorization || '';
        const user = AuthenticateRequest(token);
        return { user, req };
      },
      introspection: true
    });
    app.listen(config.SERVER_PORT, () => {
      console.log(`🚀 Server ready at ${config.SERVER_BASE_URL}:${config.SERVER_PORT}`);
    });
    await server.start()
    server.applyMiddleware({
      app,
      path: '/',
      cors: false
    });

  } catch (err) {
    console.error(err);
  }
})();