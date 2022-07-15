import { ProductModel } from "../../models/product"
import { ProductSales } from "../../types/ProductSales"

export async function isThePriceOk(products: ProductSales[]) {
  for await (let product of products) {
    const productDB = await ProductModel.findOne({
      where: { codeProduct: product.codeProduct }
    })

    if (Number(product.priceSales) < productDB.priceSales) {
      return productDB
    }
  }
}