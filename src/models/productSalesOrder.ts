const { DataTypes } = require('sequelize');
import { database } from "../database/db";
import { SalesOrderModel } from "./salesOrder";

export const ProductSalesOrderModel = database.define('product-sales', {
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
})

ProductSalesOrderModel.belongsTo(SalesOrderModel, {
  constraint: true,
  foreignkey: "salesOrderId",
  as: "productSalesOrder",
})

SalesOrderModel.hasMany(ProductSalesOrderModel, {
  foreignKey: "salesOrderId"
})