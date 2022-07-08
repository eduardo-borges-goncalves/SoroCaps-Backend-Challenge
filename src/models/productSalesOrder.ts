// import { DataTypes  } from "sequelize/types";
const { DataTypes } = require('sequelize');
import { database } from "../db";

export const ProductSalesOrderModel = database.define('product-sales', {
  codeProduct: {
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    allowNull: false,
    primaryKey: true,
  }, 
  priceSales: {
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  quantity: {
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  salesOrderId: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    references : {
      model: "sales-orders", 
      key: "id"
    }
  }
})

ProductSalesOrderModel.associate = (models: any) => {
  ProductSalesOrderModel.belongsTo(models.SalesOrderModel, {
    as: "salesOrder", 
    foreignkey: "salesOrderId"
  })
}