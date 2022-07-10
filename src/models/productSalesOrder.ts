const { DataTypes } = require('sequelize');
import { db } from ".";
import { SalesOrderModel } from "./salesOrder";


export const ProductSalesOrderModel = db.sequelize.define('product-sales', {
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
})

SalesOrderModel.hasMany(ProductSalesOrderModel, {
  foreignKey: "salesOrderId"
})