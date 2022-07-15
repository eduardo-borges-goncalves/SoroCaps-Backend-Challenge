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
exports.createProductsSales = void 0;
const productSalesOrder_1 = require("../../models/productSalesOrder");
const createProductsSales = (res, products, salesOrderId) => __awaiter(void 0, void 0, void 0, function* () {
    yield products.forEach((product) => __awaiter(void 0, void 0, void 0, function* () {
        if (!product.codeProduct)
            res.status(400).send({ error: "Código do Produto é obrigatório" });
        if (!product.quantity)
            res.status(400).send({ error: "Quantidade do Produto é obrigatório" });
        if (!product.priceSales)
            res.status(400).send({ error: "Preço de venda do Produto é obrigatório" });
        yield productSalesOrder_1.ProductSalesOrderModel.create({
            codeProduct: product.codeProduct,
            quantity: product.quantity,
            priceSales: product.priceSales,
            salesOrderId: salesOrderId
        });
    }));
});
exports.createProductsSales = createProductsSales;
