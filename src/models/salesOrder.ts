import { DataTypes  } from "sequelize/types";
import { database } from "../db";

export const SalesOrderModel = database.define('product', {
  id: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    primaryKey: true,
  },
  status: {
    type: DataTypes.STRING, 
    allowNull: false, // como passar valor padrão pra esse campo?
  },
  clientId: {
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: {
      model: "ClientModel", 
      key: "id"
    }
  }, 
})

SalesOrderModel.associate = (models: any) => {
  SalesOrderModel.belongsTo(models.client, {
    as: "client", 
    foreignKey: "clientId"
  });

  SalesOrderModel.hasMany(models.ProductSalesModel, {
    as: "productSales", 
    foreignKey: "salesOrderId"
  })
}

// cadastrar um cliente 

// front cria salesOrderId
// front cria os produtos de venda com o salesOrderId
// front envia o cadastro dos produtos e do pedido de venda para o back 

