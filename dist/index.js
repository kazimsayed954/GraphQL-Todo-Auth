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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = require("dotenv");
const schema_graphql_1 = __importDefault(require("./schema/schema.graphql"));
const dbConnection_1 = require("./utils/dbConnection");
const resolvers_1 = require("./resolvers");
const utils_keyvaluecache_1 = require("@apollo/utils.keyvaluecache");
const contextHandler_1 = require("./utils/contextHandler");
// @ts-ignore
const graphqlUploadExpress = require("graphql-upload/public/graphqlUploadExpress.js");
(0, dotenv_1.configDotenv)();
(0, dbConnection_1.dbConnection)();
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
const server = new server_1.ApolloServer({
    typeDefs: schema_graphql_1.default,
    resolvers: resolvers_1.resolvers,
    csrfPrevention: false,
    cache: new utils_keyvaluecache_1.InMemoryLRUCache({
        ttl: 300,
    }),
    plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
});
function startApolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield server.start();
        app.use(graphqlUploadExpress());
        app.use(express_1.default.static("public"));
        app.use('/graphql', express_1.default.json(), (0, express4_1.expressMiddleware)(server, {
            context: ({ req }) => __awaiter(this, void 0, void 0, function* () {
                return yield (0, contextHandler_1.contextHandler)(req);
            }),
        }));
        yield new Promise((resolve) => httpServer.listen({ port: parseInt(process.env.PORT) }, resolve));
        console.log(`🚀 Server ready at http://localhost:${process.env.PORT}/graphql`);
    });
}
startApolloServer().catch((err) => {
    console.error('Error starting Apollo Server:', err);
});
