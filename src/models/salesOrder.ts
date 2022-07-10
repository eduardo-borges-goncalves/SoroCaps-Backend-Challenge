const { DataTypes } = require('sequelize');
import { db } from ".";
import { ClientModel } from "./client";

export const SalesOrderModel = db.sequelize.define('sales-orders', {
  id: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    autoIncrement: true, 
    primaryKey: true,
  },
  status: {
    type: DataTypes.STRING, 
    allowNull: false, 
    defaultValue: "EM PROCESSO"
  },
})

SalesOrderModel.belongsTo(ClientModel, {
  constraint: true,
  foreignKey: "clientId", 
  as: "salesOrder"
})

ClientModel.hasMany(SalesOrderModel, {
  foreignKey: "clientId"
})
