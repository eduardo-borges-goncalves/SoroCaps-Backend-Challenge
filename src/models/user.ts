const { DataTypes } = require('sequelize');
import { db } from ".";

export const UserModel = db.sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER, 
    allowNull: false, 
    autoIncrement: true, 
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING, 
    allowNull: false
  }, 
  userLogin: {
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true, 
  }, 
  password: {
    type: DataTypes.STRING, 
    allowNull: false
  }
})

