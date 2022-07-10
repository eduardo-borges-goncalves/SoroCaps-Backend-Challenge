const { DataTypes } = require('sequelize');
import { db } from ".";

export const ClientModel = db.sequelize.define('clients', {
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
    allowNull: false, 
    unique: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
})


