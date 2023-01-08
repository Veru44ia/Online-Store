import { IProduct } from "../../../data/types";

export class HeaderHandler {

  static getLocalStorageArr() {
    let productInCart: string;
    const productInCartNullable = localStorage.getItem("productInCart");
    if (productInCartNullable !== null) {
      productInCart = productInCartNullable
    } else {
      productInCart = "[]";
    }
    const storageProducts: IProduct[] = JSON.parse(productInCart);
    return storageProducts
  }

  static setPrice() {
    const totalPrice = document.getElementById('cart-total') as HTMLDivElement;
    const storageProducts = HeaderHandler.getLocalStorageArr()
    let priceText = 0
    storageProducts.forEach((item) => {
      priceText += item.price
    })
    totalPrice.innerText = `${priceText.toString()} USD`
  }

  static setCount() {
    const totalCount = document.getElementById('cart-count') as HTMLDivElement;
    const storageProducts = HeaderHandler.getLocalStorageArr()
    storageProducts.length > 0
      ? totalCount.innerHTML = `<h6>${storageProducts.length}</h6>`
      : totalCount.innerHTML = `<h6>0</h6>`
  }
}
