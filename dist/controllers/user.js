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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const user_1 = require("../models/user");
const bcrypt = __importStar(require("bcrypt"));
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.UserModel.findAll({
            attributes: ['id', 'name', 'userLogin']
        });
        return res.status(200).json({
            data: users
        });
    }
    catch (error) {
        return next(new Error(error));
    }
});
exports.getUsers = getUsers;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield findUser(req.params.id);
        if (!user) {
            res.status(400).send({ error: "Usuário não encontrado" });
        }
        return res.status(200).json({
            data: { id: user.id, name: user.name, userLogin: user.userLogin }
        });
    }
    catch (error) {
    }
});
exports.getUser = getUser;
const postUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, userLogin, password } = req.body;
        if (!name || !userLogin || !password) {
            res.status(400).send({ error: "Característica necessária à criação não informada" });
        }
        const hashPassword = yield bcrypt.hash(password, 16);
        const user = yield user_1.UserModel.create({
            name, userLogin, password: hashPassword
        });
        return res.status(201).json({
            data: { id: user.id, name: user.name, userLogin: user.userLogin }
        });
    }
    catch (error) {
        return next(new Error(error));
    }
});
exports.postUser = postUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, userLogin, password } = req.body;
        const user = yield findUser(req.params.id);
        if (!user) {
            res.status(400).send({ error: "Usuário não encontrado" });
        }
        const hashPassword = yield bcrypt.hash(password, 8);
        yield user_1.UserModel.update({
            name: name || user.name,
            userLogin: userLogin || user.userLogin,
            password: hashPassword || user.password
        }, {
            where: { id: user.id },
            returning: true,
            plain: true
        });
        const updatedUser = yield findUser(req.params.id);
        return res.status(201).json({
            data: {
                id: updatedUser.id,
                name: updatedUser.name,
                userLogin: updatedUser.userLogin
            }
        });
    }
    catch (error) {
        return next(new Error(error));
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = findUser(req.params.id);
        if (!user) {
            res.status(400).send({ error: "Usuário não encontrado" });
        }
        return res.status(204).send({});
    }
    catch (error) {
        return next(new Error(error));
    }
});
exports.deleteUser = deleteUser;
const findUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.UserModel.findOne({
        where: { id }
    });
});
