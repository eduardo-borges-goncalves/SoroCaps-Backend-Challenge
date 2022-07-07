import { DataTypes  } from "sequelize/types";
import { database } from "../db";

export const ClientModel = database.define('client', {
  id: {
    type: DataTypes.INTEGER, 
    allowNull: false, 
    autoIncrement: true, 
    primaryKey: true,
  },
  companyName: {
    type: DataTypes.STRING, 
    allowNull: false
  }, 
  cnpj: {
    type: DataTypes.STRING, 
    allowNull: false // não pode ser repetido
  }, 
  address: {
    type: DataTypes.STRING, 
    allowNull: false 
  }, 
})

ClientModel.associate = (models: any) => {
  ClientModel.hasMany(models.SalesOrderModel, {
    as: "salesOrder", 
    foreignKey: "clientId"
  })
}

