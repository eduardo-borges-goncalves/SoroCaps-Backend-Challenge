import express from "express";
import controller from "../controllers"
const router = express.Router();

router.get('/user', controller.getUsers());
router.get('/user', controller.getUser());
router.post('/user', controller.postUser());
router.put('/user', controller.updateUser());
router.delete('/user', controller.deleteUser());

router.get('/client', controller.getClients());
router.get('/client', controller.getClient());
router.post('/client', controller.postClient());
router.put('/client', controller.updateClient());
router.delete('/client', controller.deleteClient());

router.get('/product', controller.getProducts());
router.get('/product', controller.getProduct());
router.post('/product', controller.postProduct());
router.put('/product', controller.updateProduct());
router.delete('/product', controller.deleteProduct());

router.get('/sales-order', controller.getSalesOrder());
router.get('/sales-order', controller.getSaleOrder());
router.post('/sales-order', controller.postSaleOrder());
router.put('/sales-order', controller.updateSaleOrder());
router.delete('/sales-order', controller.deleteSaleOrder());

export const router; 