import express from "express";

import { getUsers, getUser, postUser, updateUser, deleteUser } from "../controllers/user";
import { getClients, getClient, postClient, updateClient, deleteClient } from "../controllers/client";
import { getProducts, getProduct, postProduct, updateProduct, deleteProduct } from "../controllers/product";
import { getSalesOrders, getSalesOrder, postSalesOrder, updateSalesOrder, deleteSalesOrder } from "../controllers/salesOrder";
import { signIn } from "../controllers/login";
import { authentication } from "../middlewares/authentication";

const router = express.Router();

router.post('/login', signIn);

router.use(authentication)

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

router.get('/product/sales-order', getProducts);
router.get('/product/sales-order/:id', getProduct);
router.post('/product/sales-order', postProduct);
router.put('/product/sales-order/:id', updateProduct);
router.delete('/product/sales-order/:id', deleteProduct);

router.get('/sales-order', getSalesOrders);
router.get('/sales-order/:id', getSalesOrder);
router.post('/sales-order', postSalesOrder);
router.put('/sales-order/:id', updateSalesOrder);
router.delete('/sales-order/:id', deleteSalesOrder);


export default  router; 