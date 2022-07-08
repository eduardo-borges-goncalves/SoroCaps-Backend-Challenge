import express from "express";

import { getUsers, getUser, postUser, updateUser, deleteUser } from "../controllers/user";
import { getClients, getClient, postClient, updateClient, deleteClient } from "../controllers/client";
import { getProducts, getProduct, postProduct, updateProduct, deleteProduct } from "../controllers/product";
import { getSalesOrders, getSalesOrder, postSalesOrder, updateSalesOrder, deleteSalesOrder } from "../controllers/salesOrder";
import { signIn } from "../controllers/login";

const router = express.Router();

// router.get('/', () => console.log("hello"));
router.get('/user', getUsers);
router.get('/user', getUser);
router.post('/user', postUser);
router.put('/user', updateUser);
router.delete('/user', deleteUser);

router.get('/client', getClients);
router.get('/client', getClient);
router.post('/client', postClient);
router.put('/client', updateClient);
router.delete('/client', deleteClient);

router.get('/product', getProducts);
router.get('/product', getProduct);
router.post('/product', postProduct);
router.put('/product', updateProduct);
router.delete('/product', deleteProduct);

router.get('/product/sales-order', getProducts);
router.get('/product/sales-order', getProduct);
router.post('/product/sales-order', postProduct);
router.put('/product/sales-order', updateProduct);
router.delete('/product/sales-order', deleteProduct);

router.get('/sales-order', getSalesOrders);
router.get('/sales-order', getSalesOrder);
router.post('/sales-order', postSalesOrder);
router.put('/sales-order', updateSalesOrder);
router.delete('/sales-order', deleteSalesOrder);

router.post('/login', signIn);

export default  router; 