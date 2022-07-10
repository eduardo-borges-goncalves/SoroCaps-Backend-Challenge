const { DataTypes } = require('sequelize')
import { db } from ".";

export const ProductModel = db.sequelize.define('product', {
  codeProduct: {
    type: DataTypes.INTEGER, 
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