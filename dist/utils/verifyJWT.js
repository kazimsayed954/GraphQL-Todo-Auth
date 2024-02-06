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
exports.getUserByToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_model_1 = __importDefault(require("../models/User.model"));
function getUserByToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!token) {
            return {
                error: "Token Not Found",
                message: "Please Provide a Valid Token",
            };
        }
        try {
            if (token) {
                const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                const user = yield User_model_1.default.findOne({ _id: decodedToken.id });
                if (user)
                    return user;
            }
            return {
                error: "Invalid Token",
                message: "Token Expired.",
            };
        }
        catch (error) {
            return {
                error: "Invalid Token",
                message: "Token Expired.",
            };
        }
    });
}
exports.getUserByToken = getUserByToken;
