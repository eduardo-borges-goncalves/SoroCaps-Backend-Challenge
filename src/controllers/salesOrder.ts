import { Request, Response, NextFunction } from "express"
import { ProductSalesOrderModel } from "../models/productSalesOrder"
import { SalesOrderModel } from "../models/salesOrder"

type ProductSales = {
    codeProduct: string, 
    salesOrderPrice: number
    quantity: number, 
}

interface SalesOrder {
    saleOrderId: string, 
    client: string, 
    status: string, 
}

export const getSalesOrders = (req: Request, res: Response, next: NextFunction) => {
    try {
        const salesOrders = await SalesOrderModel.findAll({
            include: [{
                model: product-SalesOrderModel, 
                as: "productSales"
            }]
        })
        if (salesOrders.length === 0) {
            return res.status(204).send({ message: "Nenhum pedido de venda cadastrado" })
        }

        return res.status(200).json({
            data: salesOrders
        })
    } catch (error: any) {
        return next(new Error(error))
    }
}

export const getSalesOrder = (req: Request, res: Response, next: NextFunction) => {
    try {
        const salesOrder = await SalesOrderModel.findOne({
            where: { id: req.params.id }, 
            include: [{
                model: product-sales, 
                as: "productSales"
            }]
        })
        if (!salesOrder) {
            return res.status(400).send({ error: "Pedido de venda não encontrado" });
        }

        return res.status(200).json({
            data: salesOrder
        })
    } catch (error: any) {
        return next(new Error(error))
    }
}

export const postSalesOrder = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { status, clientId, products } = req.body;
        if (!status) res.status(400).send({ error: "Status é necessário à criação do pedido de venda" })
        if (!clientId) res.status(400).send({ error: "ClientId é necessário à criação do pedido de venda" })
        if (!products) res.status(400).send({ error: "Produto é necessário à criação do pedido de venda" })
        
        const salesOrder = await SalesOrderModel.create({ status, clientId })

        products.map(async (product) => {
            await ProductSalesOrderModel.create({
                quantity: product.quantity, 
                codeProduct: product.codeProduct, 
                salesPrice: product.salesPrice, 
                salesOrderId: salesOrder.id
            })
        })

        const salesOrderWithProducts = await SalesOrderModel.findOne({
            where: {id: salesOrder.id}, 
            include: [{
                model: product-sales, 
                as: "productSales",
            }],
        })

        return res.status(201).json({
            data: salesOrderWithProducts
        })
    } catch (error) {
        return next(new Error(error));
    }
}

export const updateSalesOrder = (req: Request, res: Response, next: NextFunction) => {
    try {
        const salesOrder = await SalesOrderModel.findOne({
            where: { id: req.params.id }
        })
        if (!salesOrder) {
            return res.status(400).send({ error: 'Pedido de venda não encontrado' });
        }

        const updatedSalesOrder= await SalesOrderModel.update(
            {
                status: status || salesOrder.status,
                clientId: clientId || salesOrder.clientId,
            },
            {
                where: {id: salesOrder.id},
                returning: true,
                plain: true,               
            }
        )

        return res.status(201).json({
            data: updatedSalesOrder
        })
    } catch (error) {
        return next(new Error(error))
    }
}

export const deleteSalesOrder = (req: Request, res: Response, next: NextFunction) => {
    try {
        const salesOrder = await SalesOrderModel.findOne({
            where: { id: req.params.id }
        });
        if (!salesOrder) {
            return res.status(400).send({ error: 'Pedido de venda não encontrado' });
        };

        await salesOrder.destroy
        return res.status(204).send({})
    } catch (error) {
        return next(new Error(error))
    }
}

// front cria o pedido de venda -> manda pro back
// front cria os produtos da venda em outra rota 
// back devolve os produtos somados com o pedido 