import { Response } from "express"

export const validationPrice = async (priceIncorrect: any, res: Response) => {
  if (priceIncorrect) {
    const currentPrice = priceIncorrect.priceSales.toLocaleString('pt-BR',
      { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })
    return res.status(409)
      .json(
        `O Preço de venda do produto ${priceIncorrect.name} não pode ser inferior ao cadastrado: ${currentPrice}.`
      )
  }
}