import { DataTypes  } from "sequelize/types";
import { database } from "../db";

export const SalesOrderModel = database.define('product', {
  salesId: {
    type: DataTypes.INTEGER, 
    allowNull: false, 
    autoIncrement: true, 
    primaryKey: true,
  },
  status: {
    type: DataTypes.STRING, 
    allowNull: false, 
  },
  idClient: {
    type: DataTypes.INTEGER, 
    allowNull: false
  }, 
  codeProduct: {
    type: DataTypes.STRING, 
    allowNull: false,
  }, 
})

SalesOrderModel.associate = (models: any) => {
  SalesOrderModel.belongsTo(models.client, {
    as: "client", 
    foreignKey: "idClient"
  });

  SalesOrderModel.hasMany(models.ProductSalesModel, {
    as: "productSales", 
    foreignKey: "codeProduct"
  })
}

// o cliente tem relacionamento com o pedido de venda 
