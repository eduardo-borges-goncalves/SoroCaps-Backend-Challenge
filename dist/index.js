"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./config/env");
const express_1 = __importStar(require("express"));
const routes_1 = __importDefault(require("./routes"));
const models_1 = require("./models");
const cors_1 = __importDefault(require("cors"));
const morganBody = require('morgan-body');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const app = (0, express_1.default)();
const log = fs.createWriteStream(path.join(__dirname, "./logs", `${moment().format('YYYY-MM-DD')}.log`), { flags: "a" });
morganBody(app, {
    noColors: true,
    stream: log
});
// create swager       
app.use((0, express_1.json)());
app.use((0, cors_1.default)({ credentials: true, origin: true }));
app.use(routes_1.default);
models_1.db.sequelize.sync()
    .then(() => {
    app.listen(process.env.PORT, () => console.log(`Server is running at port ${process.env.PORT}`));
});
