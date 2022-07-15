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
exports.deleteSalesOrder = exports.updateSalesOrder = exports.postSalesOrder = exports.getSalesOrders = void 0;
var client_1 = require("../models/client");
var productSalesOrder_1 = require("../models/productSalesOrder");
var salesOrder_1 = require("../models/salesOrder");
var createProductsSales_1 = require("../services/SalesOrders/createProductsSales");
var priceSalesOrder_1 = require("../services/SalesOrders/priceSalesOrder");
var validationPrice_1 = require("../services/SalesOrders/validationPrice");
var getSalesOrders = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var salesOrders, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, client_1.ClientModel.findAll({
                        include: [{
                                model: salesOrder_1.SalesOrderModel,
                                include: [productSalesOrder_1.ProductSalesOrderModel]
                            }]
                    })];
            case 1:
                salesOrders = _a.sent();
                if (salesOrders.length === 0) {
                    return [2 /*return*/, res.status(204).send({ message: "Nenhum pedido de venda cadastrado" })];
                }
                return [2 /*return*/, res.status(200).json(salesOrders)];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, next(new Error(error_1))];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getSalesOrders = getSalesOrders;
var postSalesOrder = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, clientId, products, salesOrder, priceIncorrect, salesOrderWithProducts, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, clientId = _a.clientId, products = _a.products;
                if (!clientId)
                    res.status(400).send({ error: "ClientId é necessário à criação do pedido de venda" });
                if (!products)
                    res.status(400).send({ error: "Produto é necessário à criação do pedido de venda" });
                return [4 /*yield*/, salesOrder_1.SalesOrderModel.create({ clientId: clientId })];
            case 1:
                salesOrder = _b.sent();
                return [4 /*yield*/, (0, priceSalesOrder_1.isThePriceOk)(products)];
            case 2:
                priceIncorrect = _b.sent();
                (0, validationPrice_1.validationPrice)(priceIncorrect, res);
                (0, createProductsSales_1.createProductsSales)(res, products, salesOrder.id);
                return [4 /*yield*/, client_1.ClientModel.findAll({
                        where: { id: clientId },
                        include: [{
                                model: salesOrder_1.SalesOrderModel,
                                where: { id: salesOrder.id },
                                include: [productSalesOrder_1.ProductSalesOrderModel]
                            }]
                    })];
            case 3:
                salesOrderWithProducts = _b.sent();
                return [2 /*return*/, res.status(201).json(salesOrderWithProducts)];
            case 4:
                error_2 = _b.sent();
                return [2 /*return*/, next(new Error(error_2))];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.postSalesOrder = postSalesOrder;
var updateSalesOrder = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var salesOrder, _a, status_1, clientId, updatedSalesOrder, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                return [4 /*yield*/, salesOrder_1.SalesOrderModel.findOne({
                        where: { id: req.params.id }
                    })];
            case 1:
                salesOrder = _b.sent();
                if (!salesOrder)
                    return [2 /*return*/, res.status(400).send({ error: 'Pedido de venda não encontrado' })];
                _a = req.body, status_1 = _a.status, clientId = _a.clientId;
                return [4 /*yield*/, salesOrder_1.SalesOrderModel.update({
                        status: status_1 || salesOrder.status,
                        clientId: clientId || salesOrder.clientId
                    }, {
                        where: { id: salesOrder.id },
                        returning: true,
                        plain: true
                    })];
            case 2:
                updatedSalesOrder = _b.sent();
                return [2 /*return*/, res.status(201).json({ data: updatedSalesOrder })];
            case 3:
                error_3 = _b.sent();
                return [2 /*return*/, next(new Error(error_3))];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateSalesOrder = updateSalesOrder;
var deleteSalesOrder = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var salesOrder, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, salesOrder_1.SalesOrderModel.findOne({
                        where: { id: req.params.id }
                    })];
            case 1:
                salesOrder = _a.sent();
                if (!salesOrder)
                    return [2 /*return*/, res.status(400).send({ error: 'Pedido de venda não encontrado' })];
                return [4 /*yield*/, salesOrder.destroy];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(204).send({})];
            case 3:
                error_4 = _a.sent();
                return [2 /*return*/, next(new Error(error_4))];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteSalesOrder = deleteSalesOrder;
