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
const path_1 = __importDefault(require("path"));
const user_service_1 = require("../../services/user.service");
const fs_1 = __importDefault(require("fs"));
const UserMutation = {
    register: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, user_service_1.registerUser)(args === null || args === void 0 ? void 0 : args.user);
        return data;
    }),
    login: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, user_service_1.loginUser)(args === null || args === void 0 ? void 0 : args.user);
        return data;
    }),
    uploadProfilePic: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
        const { file } = args;
        const rootDirectory = process.cwd();
        const { createReadStream, filename, mimetype, encoding } = yield (file === null || file === void 0 ? void 0 : file.file);
        const stream = createReadStream();
        const pathName = path_1.default.join(rootDirectory, 'public', 'images', filename);
        yield stream.pipe(fs_1.default.createWriteStream(pathName));
        return {
            profilePic: `http://localhost:7000/images/${filename}`
        };
    })
};
exports.default = UserMutation;
