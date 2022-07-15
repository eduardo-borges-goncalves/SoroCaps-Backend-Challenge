"use strict";
exports.__esModule = true;
exports.verifyToken = exports.createToken = void 0;
var jwt = require("jsonwebtoken");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var createToken = function (id) {
    return process.env.APP_SECRET && jwt.sign({ userId: id }, process.env.APP_SECRET, { expiresIn: '1h' });
};
exports.createToken = createToken;
var verifyToken = function (token) {
    var decoded = process.env.APP_SECRET && jwt.verify(token, process.env.APP_SECRET);
    return decoded;
};
exports.verifyToken = verifyToken;
