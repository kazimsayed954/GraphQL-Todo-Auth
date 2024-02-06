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
exports.getTodoById = exports.getTodos = exports.deleteTodo = exports.updateTodo = exports.createTodo = void 0;
const Todo_model_1 = __importDefault(require("../models/Todo.model"));
function createTodo(todo, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield Todo_model_1.default.create(Object.assign(Object.assign({}, todo), { userId }));
            return data;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.createTodo = createTodo;
function updateTodo(todo, todoId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield Todo_model_1.default.updateOne({ _id: todoId, userId }, todo);
            return result === null || result === void 0 ? void 0 : result.acknowledged;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.updateTodo = updateTodo;
function deleteTodo(todoId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield Todo_model_1.default.deleteOne({ _id: todoId, userId });
            return (result === null || result === void 0 ? void 0 : result.deletedCount) === 1;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.deleteTodo = deleteTodo;
function getTodos(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const todos = yield Todo_model_1.default.find({ userId });
            return todos;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.getTodos = getTodos;
function getTodoById(todoId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const todo = yield Todo_model_1.default.findOne({ _id: todoId, userId }).populate("userId");
            return todo;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.getTodoById = getTodoById;
