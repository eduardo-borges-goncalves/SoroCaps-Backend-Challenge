"use strict";
exports.__esModule = true;
exports.ProductModel = void 0;
var DataTypes = require('sequelize').DataTypes;
var _1 = require(".");
exports.ProductModel = _1.db.sequelize.define('product', {
    codeProduct: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
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
    }
});
