// import { DataTypes  } from "sequelize/types";
const { DataTypes } = require('sequelize');
import { database } from "../db";

export const ProductModel = database.define('product', {
  codeProduct: {
    type: DataTypes.STRING, 
    autoIncrement: true, 
    allowNull: false,
    primaryKey: true,
  }, 
  name: {
    type: DataTypes.STRING, 
    allowNull: false
  }, 
  description: {
    type: DataTypes.STRING, 
    allowNull: false 
  }, 
  measurementUnit: {
    type: DataTypes.STRING, 
    allowNull: false 
  },
  pricePurchase: {
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  priceSales: {
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
})