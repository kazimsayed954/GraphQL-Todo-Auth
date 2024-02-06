"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProfile = exports.loginUser = exports.registerUser = void 0;
const argon = __importStar(require("argon2"));
const User_model_1 = __importDefault(require("../models/User.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ProfileImage_model_1 = __importDefault(require("../models/ProfileImage.model"));
const nanoid_1 = require("nanoid");
function registerUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const { fullName, email, password } = user;
        try {
            const hashedPassword = yield argon.hash(password);
            const user = yield User_model_1.default.create({ fullName, email, password: hashedPassword });
            return user;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.registerUser = registerUser;
function loginUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = user;
            const userData = yield User_model_1.default.findOne({ email });
            if (!userData)
                throw new Error("Not Found User");
            const isPasswordMatch = yield argon.verify(userData.password, password);
            if (!isPasswordMatch)
                throw new Error("Wrong Password Provided");
            const jwtToken = jsonwebtoken_1.default.sign({ id: userData.id }, process.env.JWT_SECRET, { expiresIn: '12h' });
            const { password: pwd } = userData, rest = __rest(userData, ["password"]);
            return { rest, token: jwtToken };
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.loginUser = loginUser;
function uploadProfile(userId, file) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rootDirectory = process.cwd();
            const { createReadStream, filename, mimetype, encoding } = yield file;
            const stream = createReadStream();
            const filenameId = (0, nanoid_1.nanoid)();
            const pathName = path_1.default.join(rootDirectory, 'public', 'images', `${filenameId}${filename}`);
            yield stream.pipe(fs_1.default.createWriteStream(pathName));
            const data = yield ProfileImage_model_1.default.create({ url: `http://localhost:7000/images/${filename}` });
            const profilePic = yield User_model_1.default.findOneAndUpdate({ _id: userId }, { profileId: data === null || data === void 0 ? void 0 : data._id }, { new: true });
            console.log('data', data);
            console.log('profilePic', profilePic);
            return {
                profilePic: `http://localhost:7000/images/${filename}`
            };
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.uploadProfile = uploadProfile;
