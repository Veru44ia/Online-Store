import { ProductHandler } from "./ProductHandler";
import { ImgHandler } from "./ImgHandler";
import { HeaderHandler } from "../../../core/components/header/code/HeaderHandler";

export class ProductPageHandler {

  render() {
    HeaderHandler.setCount()
    HeaderHandler.setPrice()
    ImgHandler.render()
    ProductHandler.render()
  }

}