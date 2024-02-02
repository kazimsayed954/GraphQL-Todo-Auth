import {ApolloServer} from '@apollo/server';
import { configDotenv } from 'dotenv';
import {startStandaloneServer} from '@apollo/server/standalone';
import typeDefs from './schema/schema.graphql';
import { dbConnection } from './utils/dbConnection';
import { resolvers } from './resolvers';
import { contextHandler } from './utils/contextHandler';
configDotenv();
dbConnection();

const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  async function startApolloServer() {
    const { url } = await startStandaloneServer(server, {
        context: async({req}): Promise<any>=>{     
           return await contextHandler(req)
        },
        listen: { port: parseInt(process.env.PORT as string) },
      });
      console.log(`🚀  Server ready at: ${url}`);
  }

  startApolloServer().catch((err) => {
    console.error('Error starting Apollo Server:', err);
  });
  
