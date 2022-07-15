'use strict';
exports.__esModule = true;
exports.db = void 0;
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';
var envVars = require('../database/config/config');
var config = envVars[env];
exports.db = {};
var sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
}
else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}
Object.keys(exports.db).forEach(function (modelName) {
    if (exports.db[modelName].associate) {
        exports.db[modelName].associate(exports.db);
    }
});
exports.db.sequelize = sequelize;
exports.db.Sequelize = Sequelize;
