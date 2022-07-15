'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const envVars = require('../database/config/config');
const config = envVars[env];
exports.db = {};
let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
}
else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}
Object.keys(exports.db).forEach(modelName => {
    if (exports.db[modelName].associate) {
        exports.db[modelName].associate(exports.db);
    }
});
exports.db.sequelize = sequelize;
exports.db.Sequelize = Sequelize;
