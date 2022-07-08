import { DataTypes  } from "sequelize/types";
import { database } from "../db";

export const SalesOrderModel = database.define('sales-orders', {
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
  SalesOrderModel.belongsTo(models.clients, {
    as: "client", 
    foreignKey: "clientId"
  });

  SalesOrderModel.hasMany(models.product-sales, {
    as: "productSales", 
    foreignKey: "salesOrderId", 
    onDelete: "CASCADE"
  })
}

// cadastrar um cliente 

// front solicita novo pedido de venda 
// back cria pedido de venda e devolve id pro front
// front cria os produtos de venda com o salesOrderId
// front envia o cadastro dos produtos para o back 

// COMO O FRONT VAI CRIAR O ID SENDO QUE ELE NÃO SABE SE AQUELE ID EXISTE OU NAO?
