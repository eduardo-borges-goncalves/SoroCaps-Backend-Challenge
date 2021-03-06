"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const client_1 = require("../controllers/client");
const product_1 = require("../controllers/product");
const salesOrder_1 = require("../controllers/salesOrder");
const login_1 = require("../controllers/login");
const authentication_1 = require("../middlewares/authentication");
const router = express_1.default.Router();
router.post('/login', login_1.signIn);
router.use(authentication_1.authentication);
router.get('/users', user_1.getUsers);
router.get('/users/:id', user_1.getUser);
router.post('/users', user_1.postUser);
router.put('/users/:id', user_1.updateUser);
router.delete('/users/:id', user_1.deleteUser);
router.get('/clients', client_1.getClients);
router.get('/clients/:companyName', client_1.getClient);
router.post('/clients', client_1.postClient);
router.put('/clients/:id', client_1.updateClient);
router.delete('/clients/:id', client_1.deleteClient);
router.get('/products', product_1.getProducts);
router.get('/products/:name', product_1.getProduct);
router.post('/products', product_1.postProduct);
router.put('/products/:id', product_1.updateProduct);
router.delete('/products/:id', product_1.deleteProduct);
router.get('/sales-orders', salesOrder_1.getSalesOrders);
router.post('/sales-orders', salesOrder_1.postSalesOrder);
router.put('/sales-orders/:id', salesOrder_1.updateSalesOrder);
router.delete('/sales-orders/:id', salesOrder_1.deleteSalesOrder);
exports.default = router;
