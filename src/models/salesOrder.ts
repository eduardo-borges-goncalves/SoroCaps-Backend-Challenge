const { DataTypes } = require('sequelize');
import { database } from "../database/db";
import { ClientModel } from "./client";

export const SalesOrderModel = database.define('sales-orders', {
  id: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    autoIncrement: true, 
    primaryKey: true,
  },
  status: {
    type: DataTypes.STRING, 
    allowNull: false, // como passar valor padrão pra esse campo?
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
