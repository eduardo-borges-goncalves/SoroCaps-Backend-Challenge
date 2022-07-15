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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.deleteClient = exports.updateClient = exports.postClient = exports.getClient = exports.getClients = void 0;
var client_1 = require("../models/client");
var getClients = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var clients, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, client_1.ClientModel.findAll()];
            case 1:
                clients = _a.sent();
                if (clients.length === 0) {
                    return [2 /*return*/, res.status(204).send({ message: "Nenhum cliente cadastrado" })];
                }
                return [2 /*return*/, res.status(200).json({
                        data: clients
                    })];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, next(new Error(error_1))];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getClients = getClients;
var getClient = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var companyName, clients, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                companyName = req.params.companyName;
                return [4 /*yield*/, client_1.ClientModel.findAll({
                        where: { companyName: companyName }
                    })];
            case 1:
                clients = _a.sent();
                if (!clients) {
                    return [2 /*return*/, res.status(400).send({ error: "Cliente não encontrado" })];
                }
                return [2 /*return*/, res.status(200).json(clients)];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, next(new Error(error_2))];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getClient = getClient;
var postClient = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, companyName, cnpj, address, existClient, client, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, companyName = _a.companyName, cnpj = _a.cnpj, address = _a.address;
                if (!companyName || !cnpj || !address) {
                    res.status(400).send({ error: "Propriedade necessária à criação de cliente ausente" });
                }
                return [4 /*yield*/, client_1.ClientModel.findOne({
                        where: { cnpj: cnpj }
                    })];
            case 1:
                existClient = _b.sent();
                if (existClient)
                    return [2 /*return*/, res.status(409).json("O CNPJ ".concat(existClient.cnpj, " j\u00E1 est\u00E1 cadastrado na base de dados. Favor informar novo CNPJ"))];
                if (cnpj.length !== 14)
                    return [2 /*return*/, res.status(409).json("O CNPJ deve conter 14 caracteres.")];
                return [4 /*yield*/, client_1.ClientModel.create({ companyName: companyName, cnpj: cnpj, address: address })];
            case 2:
                client = _b.sent();
                return [2 /*return*/, res.status(201).json({
                        data: client
                    })];
            case 3:
                error_3 = _b.sent();
                return [2 /*return*/, next(new Error(error_3))];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.postClient = postClient;
var updateClient = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var clientId, client, _a, companyName, cnpj, address, updatedClient, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                clientId = req.params.id;
                return [4 /*yield*/, client_1.ClientModel.findOne({
                        where: { id: clientId }
                    })];
            case 1:
                client = _b.sent();
                if (!client) {
                    return [2 /*return*/, res.status(400).send({ error: "Cliente não encontrado" })];
                }
                _a = req.body, companyName = _a.companyName, cnpj = _a.cnpj, address = _a.address;
                return [4 /*yield*/, client_1.ClientModel.update({
                        companyName: companyName || client.companyName,
                        cnpj: cnpj || client.cnpj,
                        address: address || client.address
                    }, {
                        where: { id: client.id },
                        returning: true,
                        plain: true
                    })];
            case 2:
                updatedClient = _b.sent();
                return [2 /*return*/, res.status(201).json({
                        data: exports.updateClient
                    })];
            case 3:
                error_4 = _b.sent();
                return [2 /*return*/, next(new Error(error_4))];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateClient = updateClient;
var deleteClient = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var client, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, client_1.ClientModel.findOne({
                        where: { id: req.params.id }
                    })];
            case 1:
                client = _a.sent();
                if (!client) {
                    return [2 /*return*/, res.status(400).send({ error: 'Cliente não encontrado' })];
                }
                ;
                return [4 /*yield*/, client.destroy];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(204).send({})];
            case 3:
                error_5 = _a.sent();
                return [2 /*return*/, next(new Error(error_5))];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteClient = deleteClient;
