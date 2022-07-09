const { DataTypes } = require('sequelize');
import { database } from "../database/db";

export const UserModel = database.define('users', {
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
    allowNull: false
  }, 
  password: {
    type: DataTypes.STRING, 
    allowNull: false
  }
})

