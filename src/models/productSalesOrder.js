"use strict";
exports.__esModule = true;
exports.ProductSalesOrderModel = void 0;
var DataTypes = require('sequelize').DataTypes;
var _1 = require(".");
var salesOrder_1 = require("./salesOrder");
exports.ProductSalesOrderModel = _1.db.sequelize.define('product-sales', {
    codeProduct: {
        type: DataTypes.INTEGER,
        allowNull: false
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
    foreignkey: "salesOrderId"
});
salesOrder_1.SalesOrderModel.hasMany(exports.ProductSalesOrderModel, {
    foreignKey: "salesOrderId"
});
