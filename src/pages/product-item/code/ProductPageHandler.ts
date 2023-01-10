import { ProductHandler } from "./ProductHandler";
import { ImgHandler } from "./ImgHandler";
import { HeaderHandler } from "../../../core/components/header/code/HeaderHandler";

export const enum ProductElemClassTegs {
  IMGContainer = 'product-info__items',
}

export const enum ProductElemID {
  MainIMG = 'main-img',
  CartBTN = 'cart-BTN',
  BuyBTN = 'buy-BTN',
}

export class ProductPageHandler {

  render() {
    HeaderHandler.setCount()
    HeaderHandler.setPrice()
    ImgHandler.render()
    ProductHandler.render()
  }

}