import { Request, Response, NextFunction } from "express"
import { ProductSalesOrderModel } from "../models/productSalesOrder"

type ProductSales = {
    codeProduct: string, 
    salesOrderPrice: number
    quantity: number, 
    salesOrderIs: number, 
}

export const getProductsSalesOrders = (req: Request, res: Response, next: NextFunction) => {
    try {
        const productsSalesOrder = await ProductSalesOrderModel.findAll()
        if (productsSalesOrder.length === 0) {
            return res.status(204).send({ message: "Nenhum produto cadastrado para esse pedido ainda" })
        }

        return res.status(200).json({
            data: productsSalesOrder
        })
    } catch (error: any) {
        return next(new Error(error))
    }
}

export const postProductsSalesOrder = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { salesOrderPrice, quantity, salesOrderId } = req.body;
        if (!salesOrderId || !quantity || !salesOrderPrice ) {
            res.status(400).send({ error: "Propriedade necessária ao cadastro do produto ausente" })
        }
        const productSalesOrder = await ProductSalesOrderModel.create({ salesOrderPrice, quantity, salesOrderId })

        return res.status(201).json({
            data: productSalesOrder
        })
    } catch (error) {
        return next(new Error(error));
    }
}

export const updateSalesOrder = (req: Request, res: Response, next: NextFunction) => {
    try {
        const productSalesOrder = await ProductSalesOrderModel.findOne({
            where: { id: req.params.id }
        })
        if (!productSalesOrder) {
            return res.status(400).send({ error: 'Produto não encontrado' });
        }

        const updatedProductSalesOrder= await ProductSalesOrderModel.update(
            {
                salesOrderId: salesOrderId || productSalesOrder.salesOrderId,
                quantity: quantity || productSalesOrder.quantity,
                salesOrderPrice: salesOrderPrice || productSalesOrder.salesOrderPrice
            },
            {
                where: {codeProduct: productSalesOrder.codeProduct},
                returning: true,
                plain: true,               
            }
        )

        return res.status(201).json({
            data: updatedProductSalesOrder
        })
    } catch (error) {
        return next(new Error(error))
    }
}

export const deleteSalesOrder = (req: Request, res: Response, next: NextFunction) => {
    try {
        const productSalesOrder = await ProductSalesOrderModel.findOne({
            where: { id: req.params.id }
        });
        if (!productSalesOrder) {
            return res.status(400).send({ error: 'Produto não encontrado' });
        };

        await productSalesOrder.destroy
        return res.status(204).send({})
    } catch (error) {
        return next(new Error(error))
    }
}