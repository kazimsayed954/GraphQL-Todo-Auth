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
const todo_service_1 = require("../../services/todo.service");
const contextHandler_1 = require("../../utils/contextHandler");
const TodoQuery = {
    getTodos: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        if (context && context.error) {
            return (0, contextHandler_1.handleContextError)(context.error);
        }
        const todos = yield (0, todo_service_1.getTodos)(context === null || context === void 0 ? void 0 : context._id);
        return todos;
    }),
    getTodoById: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        if (context && context.error) {
            return (0, contextHandler_1.handleContextError)(context.error);
        }
        const todo = yield (0, todo_service_1.getTodoById)(args === null || args === void 0 ? void 0 : args.id, context === null || context === void 0 ? void 0 : context._id);
        return todo;
    }),
};
exports.default = TodoQuery;
