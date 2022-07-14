import { Request, Response, NextFunction } from "express"
import { ProductModel } from "../models/product"

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

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const name = req.params.name

        const products = await ProductModel.findAll({
            where: { name }
        })
        if (!products) {
            return res.status(400).send({ error: "Produto não encontrado" });
        }

        return res.status(200).json( products )
    } catch (error: any) {
        return next(new Error(error))
    }
}

export const postProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            codeProduct,
            name,
            description,
            measurementUnit,
            pricePurchase,
            priceSales
        } = req.body;

        const product = await ProductModel.create({
            codeProduct,
            name,
            description,
            measurementUnit,
            pricePurchase,
            priceSales
        })

        return res.status(201).json({ product })
    } catch (error: any) {
        return next(new Error(error));
    }
}

export const updateProduct = (req: Request, res: Response, next: NextFunction) => {
    const product = "" // escrever método que ATUALIZA product do DB

    return res.status(201).json({
        data: product
    })
}

export const deleteProduct = (req: Request, res: Response, next: NextFunction) => {
    const product = "" // escrever método que DELETA product do DB

    return res.status(201).json({
        data: product
    })
}