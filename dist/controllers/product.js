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
exports.deleteProduct = exports.updateProduct = exports.postProduct = exports.getProduct = exports.getProducts = void 0;
const product_1 = require("../models/product");
const getProducts = (req, res, next) => {
    const products = ""; // escrever método que PEGA products do DB
    return res.status(200).json({
        data: products
    });
};
exports.getProducts = getProducts;
const getProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.params.name;
        const products = yield product_1.ProductModel.findAll({
            where: { name }
        });
        if (!products) {
            return res.status(400).send({ error: "Produto não encontrado" });
        }
        return res.status(200).json(products);
    }
    catch (error) {
        return next(new Error(error));
    }
});
exports.getProduct = getProduct;
const postProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { codeProduct, name, description, measurementUnit, pricePurchase, priceSales } = req.body;
        const product = yield product_1.ProductModel.create({
            codeProduct,
            name,
            description,
            measurementUnit,
            pricePurchase,
            priceSales
        });
        return res.status(201).json({ product });
    }
    catch (error) {
        return next(new Error(error));
    }
});
exports.postProduct = postProduct;
const updateProduct = (req, res, next) => {
    const product = ""; // escrever método que ATUALIZA product do DB
    return res.status(201).json({
        data: product
    });
};
exports.updateProduct = updateProduct;
const deleteProduct = (req, res, next) => {
    const product = ""; // escrever método que DELETA product do DB
    return res.status(201).json({
        data: product
    });
};
exports.deleteProduct = deleteProduct;
