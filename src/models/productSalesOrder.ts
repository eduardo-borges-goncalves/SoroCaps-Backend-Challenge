import { DataTypes  } from "sequelize/types";
import { database } from "../db";

export const ProductSalesOrderModel = database.define('product-sales', {
  codeProduct: {
    type: DataTypes.STRING, 
    allowNull: false,
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

ProductSalesOrderModel.associate = (models: any) => {
  ProductSalesOrderModel.belongsTo(models.sales-orders, {
    as: "salesOrder", 
    foreignkey: "salesOrderId", 
  })
}