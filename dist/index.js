"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const schema_graphql_1 = require("./schema/schema.graphql");
const dbConnection_1 = require("./utils/dbConnection");
const dotenv_1 = require("dotenv");
const resolvers_1 = require("./resolvers");
const contextHandler_1 = require("./utils/contextHandler");
(0, dotenv_1.configDotenv)();
const server = new server_1.ApolloServer({
    typeDefs: schema_graphql_1.typeDefs,
    resolvers: resolvers_1.resolvers,
});
(0, dbConnection_1.dbConnection)();
function startApolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const { url } = yield (0, standalone_1.startStandaloneServer)(server, {
            context: ({ req }) => __awaiter(this, void 0, void 0, function* () {
                yield (0, contextHandler_1.contextHandler)(req);
            }),
            listen: { port: parseInt(process.env.PORT) },
        });
        console.log(`🚀  Server ready at: ${url}`);
    });
}
startApolloServer().catch((err) => {
    console.error('Error starting Apollo Server:', err);
});
