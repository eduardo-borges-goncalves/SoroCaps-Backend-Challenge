const { DataTypes } = require('sequelize');
import { database } from "../database/db";

export const ClientModel = database.define('clients', {
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


