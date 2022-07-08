import express from "express";

import { getUsers, getUser, postUser, updateUser, deleteUser } from "../controllers/user";
import { getClients, getClient, postClient, updateClient, deleteClient } from "../controllers/client";
import { getProducts, getProduct, postProduct, updateProduct, deleteProduct } from "../controllers/product";
import { getSalesOrders, getSalesOrder, postSalesOrder, updateSalesOrder, deleteSalesOrder } from "../controllers/salesOrder";

const router = express.Router();

router.get('/user', getUsers);
router.get('/user/:id', getUser);
router.post('/user', postUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

router.get('/client', getClients);
router.get('/client/:id', getClient);
router.post('/client', postClient);
router.put('/client/:id', updateClient);
router.delete('/client/:id', deleteClient);

router.get('/product', getProducts);
router.get('/product/:id', getProduct);
router.post('/product', postProduct);
router.put('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);

router.get('/sales-order', getSalesOrders);
router.get('/sales-order/:id', getSalesOrder);
router.post('/sales-order', postSalesOrder);
router.put('/sales-order/:id', updateSalesOrder);
router.delete('/sales-order/:id', deleteSalesOrder);

export default  router; 