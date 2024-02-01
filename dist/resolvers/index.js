"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const todo_mutation_1 = __importDefault(require("./mutation/todo.mutation"));
const user_mutation_1 = __importDefault(require("./mutation/user.mutation"));
const todo_query_1 = __importDefault(require("./query/todo.query"));
const user_query_1 = __importDefault(require("./query/user.query"));
const Query = Object.assign(Object.assign({}, user_query_1.default), todo_query_1.default);
const Mutation = Object.assign(Object.assign({}, user_mutation_1.default), todo_mutation_1.default);
exports.resolvers = {
    Query,
    // Mutation,
};
