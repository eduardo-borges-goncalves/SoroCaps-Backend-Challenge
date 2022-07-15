import express from "express";

import { getUsers, getUser, postUser, updateUser, deleteUser } from "../controllers/user";
import { getClients, getClient, postClient, updateClient, deleteClient } from "../controllers/client";
import { getProducts, getProduct, postProduct, updateProduct, deleteProduct } from "../controllers/product";
import { getSalesOrders, postSalesOrder, updateSalesOrder, deleteSalesOrder } from "../controllers/salesOrder";

import { signIn } from "../controllers/login";
import { authentication } from "../middlewares/authentication";

const router = express.Router();

router.post('/login', signIn);

router.use(authentication)

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', postUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

router.get('/clients', getClients);
router.get('/clients/:companyName', getClient);
router.post('/clients', postClient);
router.put('/clients/:id', updateClient);
router.delete('/clients/:id', deleteClient);

router.get('/products', getProducts);
router.get('/products/:name', getProduct);
router.post('/products', postProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

router.get('/sales-orders', getSalesOrders);
router.post('/sales-orders', postSalesOrder);
router.put('/sales-orders/:id', updateSalesOrder);
router.delete('/sales-orders/:id', deleteSalesOrder);

export default router; 