import { IProduct } from "../../../data";

export class HeaderHandler {

  static setPrice() {
    const totalPrice = document.getElementById('cart-total') as HTMLDivElement;
    let storageProducts: IProduct[] = JSON.parse(localStorage.getItem("productInCart") || "[]");
    let priceText = 0
    storageProducts.forEach((item) => {
      priceText += item.price
    })
    totalPrice.innerText = `${priceText.toString()} USD`
  }

  static setCount() {
    const totalCount = document.getElementById('cart-count') as HTMLDivElement;
    let storageProducts: IProduct[] = JSON.parse(localStorage.getItem("productInCart") || "[]");
    storageProducts.length > 0
      ? totalCount.innerHTML = `<h6>${storageProducts.length}</h6>`
      : totalCount.innerHTML = `<h6>0</h6>`
  }
}
