import { Request, Response, NextFunction } from "express"

interface Product {
    code: string, 
    name: string, 
    description: string, 
    measurementUnity: string, 
    purchasePrice: number, 
    salesPrice: number, 
}

export const getProducts = (req: Request, res: Response, next: NextFunction) => {
    const products = "" // escrever método que PEGA products do DB

    return res.status(200).json({
        data: products
    })
}

export const getProduct = (req: Request, res: Response, next: NextFunction) => {
    const product = "" // escrever método que PEGA product do DB

    return res.status(200).json({
        data: product
    })
}

export const postProduct = (req: Request, res: Response, next: NextFunction) => {
    const product = "" // escrever método que CRIA product do DB

    return res.status(201).json({
        data: product
    })
}

export const updateProduct = (req: Request, res: Response, next: NextFunction) => {
    const product = "" // escrever método que ATUALIZA product do DB

    return res.status(201).json({
        data: product
    })
}

export const deleteClient = (req: Request, res: Response, next: NextFunction) => {
    const product = "" // escrever método que DELETA product do DB

    return res.status(201).json({
        data: product
    })
}