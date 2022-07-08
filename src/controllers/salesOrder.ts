import { Request, Response, NextFunction } from "express"
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
        const salesOrders = await SalesOrderModel.findAll()
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
            where: { id: req.params.id }
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
        const { status, clientId } = req.body;
        if (!status || !clientId) {
            res.status(400).send({ error: "Propriedade necessária à criação do pedido de venda ausente" })
        }
        const salesOrder = await SalesOrderModel.create({ status, clientId })

        return res.status(201).json({
            data: salesOrder
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