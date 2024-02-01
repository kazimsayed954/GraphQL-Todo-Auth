import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
import { typeDefs } from './schema/schema.graphql';
import { dbConnection } from './utils/dbConnection';
import { configDotenv } from 'dotenv';
import { resolvers } from './resolvers';
import { contextHandler } from './utils/contextHandler';
configDotenv();

const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

//   dbConnection();
  async function startApolloServer() {
    const { url } = await startStandaloneServer(server, {
        context: async({req}:any): Promise<any>=>{
            await contextHandler(req)
        },
        listen: { port: parseInt(process.env.PORT as string) },
      });
      console.log(`🚀  Server ready at: ${url}`);
  }

  startApolloServer().catch((err) => {
    console.error('Error starting Apollo Server:', err);
  });
  
