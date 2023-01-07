import { ProductHandler } from "./ProductHandler";
import { ImgHandler } from "./ImgHandler";

export class ProductPageHandler {

  render() {
    ImgHandler.render()
    ProductHandler.render()
  }

}