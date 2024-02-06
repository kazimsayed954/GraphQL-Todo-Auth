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
exports.handleContextError = exports.contextHandler = void 0;
const verifyJWT_1 = require("./verifyJWT");
const graphql_1 = require("graphql");
const introspectionQuery = (0, graphql_1.print)((0, graphql_1.parse)((0, graphql_1.getIntrospectionQuery)()));
const contextHandler = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (req.body.query === introspectionQuery) {
        return {};
    }
    const excludedOperations = ["register", "login"];
    if (excludedOperations.includes(req.body.operationName)) {
        return null;
    }
    const token = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : '';
    let user;
    if (token) {
        user = yield (0, verifyJWT_1.getUserByToken)(token);
        if (!user) {
            return {
                error: "Unauthorized User",
                message: "User Not Found in Database.",
            };
        }
        return user;
    }
    return {
        error: "Missing token",
        message: "Authorization token is required for this operation.",
    };
});
exports.contextHandler = contextHandler;
const handleContextError = (error) => {
    throw new graphql_1.GraphQLError(error === null || error === void 0 ? void 0 : error.message, {
        extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
        },
    });
};
exports.handleContextError = handleContextError;
