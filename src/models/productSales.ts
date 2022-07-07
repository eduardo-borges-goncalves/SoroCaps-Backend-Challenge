import { DataTypes  } from "sequelize/types";
import { database } from "../db";

export const ProductSalesModel = database.define('product', {
  codeProduct: {
    type: DataTypes.STRING, 
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
  salesId: {
    type: DataTypes.INTEGER, 
    allowNull: false,
  }
})

ProductSalesModel.associate = (models: any) => {
  ProductSalesModel.belongsTo(models.SalesOrderModel, {
    as: "salesOrder", 
    foreignkey: "salesId"
  })
}