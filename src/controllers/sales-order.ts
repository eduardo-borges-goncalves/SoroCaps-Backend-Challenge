import { Request, Response, NextFunction } from "express"

interface SalesOrder {
    saleOrderId: string, 
    client: string, 
    products: string[], 
    salePrice: number, 
    quantity: number, 
    status: string, 
}

export const getSalesOrders = (req: Request, res: Response, next: NextFunction) => {
    const salesOrder = "" // escrever método que PEGA salesOrder do DB

    return res.status(200).json({
        data: salesOrder
    })
}

export const getSalesOrder = (req: Request, res: Response, next: NextFunction) => {
    const salesOrder = "" // escrever método que PEGA salesOrder do DB

    return res.status(200).json({
        data: salesOrder
    })
}

export const postSalesOrder = (req: Request, res: Response, next: NextFunction) => {
    const salesOrder = "" // escrever método que CRIA salesOrder do DB

    return res.status(201).json({
        data: salesOrder
    })
}

export const updateSalesOrder = (req: Request, res: Response, next: NextFunction) => {
    const salesOrder = "" // escrever método que ATUALIZA salesOrder do DB

    return res.status(201).json({
        data: salesOrder
    })
}

export const deleteSalesOrder = (req: Request, res: Response, next: NextFunction) => {
    const salesOrder = "" // escrever método que DELETA salesOrder do DB

    return res.status(201).json({
        data: salesOrder
    })
}