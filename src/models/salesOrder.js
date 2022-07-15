"use strict";
exports.__esModule = true;
exports.SalesOrderModel = void 0;
var DataTypes = require('sequelize').DataTypes;
var _1 = require(".");
var client_1 = require("./client");
exports.SalesOrderModel = _1.db.sequelize.define('sales-orders', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "EM PROCESSO"
    }
});
exports.SalesOrderModel.belongsTo(client_1.ClientModel, {
    constraint: true,
    foreignKey: "clientId",
    as: "salesOrder"
});
client_1.ClientModel.hasMany(exports.SalesOrderModel, {
    foreignKey: "clientId"
});
