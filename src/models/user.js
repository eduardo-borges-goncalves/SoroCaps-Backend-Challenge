"use strict";
exports.__esModule = true;
exports.UserModel = void 0;
var DataTypes = require('sequelize').DataTypes;
var _1 = require(".");
exports.UserModel = _1.db.sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userLogin: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
