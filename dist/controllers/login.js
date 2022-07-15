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
exports.signIn = void 0;
const login_1 = require("../services/Auth/login");
const signIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userLogin, password } = req.body;
        const user = yield (0, login_1.login)(userLogin, password);
        user ?
            res.status(200).json(user)
            :
                res.status(404).json({ message: "Dados inválidos" });
    }
    catch (error) {
        return next(new Error(error));
    }
});
exports.signIn = signIn;
