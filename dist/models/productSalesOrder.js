"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSalesOrderModel = void 0;
const { DataTypes } = require('sequelize');
const _1 = require(".");
const salesOrder_1 = require("./salesOrder");
exports.ProductSalesOrderModel = _1.db.sequelize.define('product-sales', {
    codeProduct: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    priceSales: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});
exports.ProductSalesOrderModel.belongsTo(salesOrder_1.SalesOrderModel, {
    constraint: true,
    foreignkey: "salesOrderId",
});
salesOrder_1.SalesOrderModel.hasMany(exports.ProductSalesOrderModel, {
    foreignKey: "salesOrderId"
});
