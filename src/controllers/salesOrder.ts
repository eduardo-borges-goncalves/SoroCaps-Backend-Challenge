import { Request, Response, NextFunction } from "express"
import { ClientModel } from "../models/client"
import { ProductSalesOrderModel } from "../models/productSalesOrder"
import { SalesOrderModel } from "../models/salesOrder"
import { createProductsSales } from "../services/SalesOrders/createProductsSales"
import { isThePriceOk } from "../services/SalesOrders/priceSalesOrder"
import { validationPrice } from "../services/SalesOrders/validationPrice"

export const getSalesOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const salesOrders = await ClientModel.findAll({
            include: [{
                model: SalesOrderModel,
                include: [ProductSalesOrderModel]
            }]
        })

        if (salesOrders.length === 0) {
            return res.status(204).send({ message: "Nenhum pedido de venda cadastrado" })
        }

        return res.status(200).json(salesOrders)
    } catch (error: any) {
        return next(new Error(error))
    }
}

export const postSalesOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { clientId, products } = req.body;
        if (!clientId) res.status(400).send({ error: "ClientId é necessário à criação do pedido de venda" })
        if (!products) res.status(400).send({ error: "Produto é necessário à criação do pedido de venda" })

        const salesOrder = await SalesOrderModel.create({ clientId })

        let priceIncorrect = await isThePriceOk(products)
        validationPrice(priceIncorrect, res)

        createProductsSales(res, products, salesOrder.id)
        const salesOrderWithProducts = await ClientModel.findAll({
            where: { id: clientId },
            include: [{
                model: SalesOrderModel,
                where: { id: salesOrder.id },
                include: [ProductSalesOrderModel]
            }]
        })

        return res.status(201).json(salesOrderWithProducts)
    } catch (error: any) {
        return next(new Error(error));
    }
}

export const updateSalesOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const salesOrder = await SalesOrderModel.findOne({
            where: { id: req.params.id }
        })
        if (!salesOrder)
            return res.status(400).send({ error: 'Pedido de venda não encontrado' });

        const { status, clientId } = req.body;
        const updatedSalesOrder = await SalesOrderModel.update(
            {
                status: status || salesOrder.status,
                clientId: clientId || salesOrder.clientId,
            },
            {
                where: { id: salesOrder.id },
                returning: true,
                plain: true,
            }
        )

        return res.status(201).json({ data: updatedSalesOrder })
    } catch (error: any) {
        return next(new Error(error))
    }
}

export const deleteSalesOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const salesOrder = await SalesOrderModel.findOne({
            where: { id: req.params.id }
        });
        if (!salesOrder)
            return res.status(400).send({ error: 'Pedido de venda não encontrado' });

        await salesOrder.destroy
        return res.status(204).send({})
    } catch (error: any) {
        return next(new Error(error))
    }
}