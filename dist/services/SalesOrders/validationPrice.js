"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationPrice = void 0;
const validationPrice = (priceIncorrect, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (priceIncorrect) {
        const currentPrice = priceIncorrect.priceSales.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
        return res.status(409)
            .json(`O Preço de venda do produto ${priceIncorrect.name} não pode ser inferior ao cadastrado: ${currentPrice}.`);
    }
});
exports.validationPrice = validationPrice;
