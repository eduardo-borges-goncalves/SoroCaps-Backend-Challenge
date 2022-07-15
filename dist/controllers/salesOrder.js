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
exports.deleteSalesOrder = exports.updateSalesOrder = exports.postSalesOrder = exports.getSalesOrders = void 0;
const client_1 = require("../models/client");
const productSalesOrder_1 = require("../models/productSalesOrder");
const salesOrder_1 = require("../models/salesOrder");
const createProductsSales_1 = require("../services/SalesOrders/createProductsSales");
const priceSalesOrder_1 = require("../services/SalesOrders/priceSalesOrder");
const validationPrice_1 = require("../services/SalesOrders/validationPrice");
const getSalesOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salesOrders = yield client_1.ClientModel.findAll({
            include: [{
                    model: salesOrder_1.SalesOrderModel,
                    include: [productSalesOrder_1.ProductSalesOrderModel]
                }]
        });
        if (salesOrders.length === 0) {
            return res.status(204).send({ message: "Nenhum pedido de venda cadastrado" });
        }
        return res.status(200).json(salesOrders);
    }
    catch (error) {
        return next(new Error(error));
    }
});
exports.getSalesOrders = getSalesOrders;
const postSalesOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clientId, products } = req.body;
        if (!clientId)
            res.status(400).send({ error: "ClientId é necessário à criação do pedido de venda" });
        if (!products)
            res.status(400).send({ error: "Produto é necessário à criação do pedido de venda" });
        const salesOrder = yield salesOrder_1.SalesOrderModel.create({ clientId });
        let priceIncorrect = yield (0, priceSalesOrder_1.isThePriceOk)(products);
        (0, validationPrice_1.validationPrice)(priceIncorrect, res);
        (0, createProductsSales_1.createProductsSales)(res, products, salesOrder.id);
        const salesOrderWithProducts = yield client_1.ClientModel.findAll({
            where: { id: clientId },
            include: [{
                    model: salesOrder_1.SalesOrderModel,
                    where: { id: salesOrder.id },
                    include: [productSalesOrder_1.ProductSalesOrderModel]
                }]
        });
        return res.status(201).json(salesOrderWithProducts);
    }
    catch (error) {
        return next(new Error(error));
    }
});
exports.postSalesOrder = postSalesOrder;
const updateSalesOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salesOrder = yield salesOrder_1.SalesOrderModel.findOne({
            where: { id: req.params.id }
        });
        if (!salesOrder)
            return res.status(400).send({ error: 'Pedido de venda não encontrado' });
        const { status, clientId } = req.body;
        const updatedSalesOrder = yield salesOrder_1.SalesOrderModel.update({
            status: status || salesOrder.status,
            clientId: clientId || salesOrder.clientId,
        }, {
            where: { id: salesOrder.id },
            returning: true,
            plain: true,
        });
        return res.status(201).json({ data: updatedSalesOrder });
    }
    catch (error) {
        return next(new Error(error));
    }
});
exports.updateSalesOrder = updateSalesOrder;
const deleteSalesOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salesOrder = yield salesOrder_1.SalesOrderModel.findOne({
            where: { id: req.params.id }
        });
        if (!salesOrder)
            return res.status(400).send({ error: 'Pedido de venda não encontrado' });
        yield salesOrder.destroy;
        return res.status(204).send({});
    }
    catch (error) {
        return next(new Error(error));
    }
});
exports.deleteSalesOrder = deleteSalesOrder;
