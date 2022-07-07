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
  salesOrderId: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    references : {
      model: "SalesOrderModel", 
      key: "id"
    }
  }
})

ProductSalesModel.associate = (models: any) => {
  ProductSalesModel.belongsTo(models.SalesOrderModel, {
    as: "salesOrder", 
    foreignkey: "salesOrderId"
  })
}