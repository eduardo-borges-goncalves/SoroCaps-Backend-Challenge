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
exports.deleteClient = exports.updateClient = exports.postClient = exports.getClient = exports.getClients = void 0;
const client_1 = require("../models/client");
const getClients = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clients = yield client_1.ClientModel.findAll();
        if (clients.length === 0) {
            return res.status(204).send({ message: "Nenhum cliente cadastrado" });
        }
        return res.status(200).json({
            data: clients
        });
    }
    catch (error) {
        return next(new Error(error));
    }
});
exports.getClients = getClients;
const getClient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companyName = req.params.companyName;
        const clients = yield client_1.ClientModel.findAll({
            where: { companyName }
        });
        if (!clients) {
            return res.status(400).send({ error: "Cliente não encontrado" });
        }
        return res.status(200).json(clients);
    }
    catch (error) {
        return next(new Error(error));
    }
});
exports.getClient = getClient;
const postClient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { companyName, cnpj, address } = req.body;
        if (!companyName || !cnpj || !address) {
            res.status(400).send({ error: "Propriedade necessária à criação de cliente ausente" });
        }
        const existClient = yield client_1.ClientModel.findOne({
            where: { cnpj: cnpj }
        });
        if (existClient)
            return res.status(409).json(`O CNPJ ${existClient.cnpj} já está cadastrado na base de dados. Favor informar novo CNPJ`);
        if (cnpj.length !== 14)
            return res.status(409).json(`O CNPJ deve conter 14 caracteres.`);
        const client = yield client_1.ClientModel.create({ companyName, cnpj, address });
        return res.status(201).json({
            data: client
        });
    }
    catch (error) {
        return next(new Error(error));
    }
});
exports.postClient = postClient;
const updateClient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientId = req.params.id;
        const client = yield client_1.ClientModel.findOne({
            where: { id: clientId }
        });
        if (!client) {
            return res.status(400).send({ error: "Cliente não encontrado" });
        }
        const { companyName, cnpj, address } = req.body;
        const updatedClient = yield client_1.ClientModel.update({
            companyName: companyName || client.companyName,
            cnpj: cnpj || client.cnpj,
            address: address || client.address
        }, {
            where: { id: client.id },
            returning: true,
            plain: true,
        });
        return res.status(201).json({
            data: exports.updateClient
        });
    }
    catch (error) {
        return next(new Error(error));
    }
});
exports.updateClient = updateClient;
const deleteClient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield client_1.ClientModel.findOne({
            where: { id: req.params.id }
        });
        if (!client) {
            return res.status(400).send({ error: 'Cliente não encontrado' });
        }
        ;
        yield client.destroy;
        return res.status(204).send({});
    }
    catch (error) {
        return next(new Error(error));
    }
});
exports.deleteClient = deleteClient;
