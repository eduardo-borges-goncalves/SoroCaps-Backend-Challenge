import { Request, Response, NextFunction } from "express"
import { ClientModel } from "../models/client"
import { ProductSalesOrderModel } from "../models/productSalesOrder"
import { SalesOrderModel } from "../models/salesOrder"

type ProductSales = {
    codeProduct: number,
    priceSales: number
    quantity: number,
}
interface SalesOrder {
    saleOrderId: string,
    client: string,
    status: string,
}

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

export const getSalesOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const salesOrder = await SalesOrderModel.findOne({
            where: { id: req.params.id },
            include: [{
                model: ProductSalesOrderModel,
            }]
        })
        if (!salesOrder) {
            return res.status(400).send({ error: "Pedido de venda não encontrado" });
        }

        return res.status(200).json(salesOrder)
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

        await products.map(async (product: ProductSales) => {
            if (!product.codeProduct) res.status(400).send({ error: "Código do Produto é obrigatório" })
            if (!product.quantity) res.status(400).send({ error: "Quantidade do Produto é obrigatório" })
            if (!product.priceSales) res.status(400).send({ error: "Preço de venda do Produto é obrigatório" })

            const productDB = await ProductModel.findOne({
                where: { codeProduct: product.codeProduct }
            })

            if (product.priceSales < productDB.priceSales)
                res.status(400).send({
                    message: `O Preço de venda do produto
                     ${productDB.name} não pode ser inferior ao cadastrado: ${productDB.priceSales}.`
                })

            await ProductSalesOrderModel.create({
                codeProduct: product.codeProduct,
                quantity: product.quantity,
                priceSales: product.priceSales,
                salesOrderId: salesOrder.id
            })
        })

        const salesOrderWithProducts = await SalesOrderModel.findOne({
            where: { id: salesOrder.id },
            include: [{
                model: ProductSalesOrderModel,
            }],
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