import { Response } from "express"
import { ProductSalesOrderModel } from "../../models/productSalesOrder"
import { ProductSales } from "../../types/ProductSales"

export const createProductsSales = async (
  res: Response, 
  products: ProductSales[], 
  salesOrderId: number) => {
  await products.forEach(async (product: ProductSales) => {
    if (!product.codeProduct) res.status(400).send({ error: "Código do Produto é obrigatório" })
    if (!product.quantity) res.status(400).send({ error: "Quantidade do Produto é obrigatório" })
    if (!product.priceSales) res.status(400).send({ error: "Preço de venda do Produto é obrigatório" })

    await ProductSalesOrderModel.create({
      codeProduct: product.codeProduct,
      quantity: product.quantity,
      priceSales: product.priceSales,
      salesOrderId: salesOrderId
    })
  })
}