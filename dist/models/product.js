"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const { DataTypes } = require('sequelize');
const _1 = require(".");
exports.ProductModel = _1.db.sequelize.define('product', {
    codeProduct: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    measurementUnit: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pricePurchase: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    priceSales: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});
