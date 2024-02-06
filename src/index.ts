import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import { configDotenv } from 'dotenv';
import typeDefs from './schema/schema.graphql';
import { dbConnection } from './utils/dbConnection';
import { resolvers } from './resolvers';
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';
import { contextHandler } from './utils/contextHandler';

// @ts-ignore
import graphqlUploadExpress from 'graphql-upload/public/graphqlUploadExpress.js';

configDotenv();
dbConnection();

const app = express();
const httpServer = http.createServer(app);


const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: false,
  cache: new InMemoryLRUCache({
    ttl:3,
  }),
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
  ],
});

async function startApolloServer() {

  await server.start();
  app.use(graphqlUploadExpress());
  app.use(express.static("public"));
  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }): Promise<any> => {
        return await contextHandler(req);
      },
    }),
  );

  await new Promise<void>((resolve) => httpServer.listen({ port: parseInt(process.env.PORT as string) }, resolve));
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}/graphql`);

}

startApolloServer().catch((err) => {
  console.error('Error starting Apollo Server:', err);
});

