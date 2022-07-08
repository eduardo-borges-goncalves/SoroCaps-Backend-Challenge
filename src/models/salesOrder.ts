const { DataTypes } = require('sequelize');
import { database } from "../db";

export const SalesOrderModel = database.define('sales-order', {
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
      model: "clients", 
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

// front solicita novo pedido de venda 
// back cria pedido de venda e devolve id pro front
// front cria os produtos de venda com o salesOrderId
// front envia o cadastro dos produtos para o back 

// COMO O FRONT VAI CRIAR O ID SENDO QUE ELE NÃO SABE SE AQUELE ID EXISTE OU NAO?
