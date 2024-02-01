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
exports.contextHandler = void 0;
const graphql_1 = require("graphql");
const verifyJWT_1 = require("./verifyJWT");
const contextHandler = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log((_a = req.body) === null || _a === void 0 ? void 0 : _a.operationName);
    const excludedOperations = ['register', 'login'];
    if (excludedOperations.includes(req.body.operationName)) {
        return null;
    }
    const token = (_b = req.headers.authorization) !== null && _b !== void 0 ? _b : '';
    const user = yield (0, verifyJWT_1.getUserByToken)(token);
    if (!user)
        // throwing a `GraphQLError` here allows us to specify an HTTP status code,
        // standard `Error`s will have a 500 status code by default
        throw new graphql_1.GraphQLError('User is not authenticated', {
            extensions: {
                code: 'UNAUTHENTICATED',
                http: { status: 401 },
            },
        });
    return user;
});
exports.contextHandler = contextHandler;
