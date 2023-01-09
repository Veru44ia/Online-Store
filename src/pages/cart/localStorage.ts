import { IProduct } from "../../core/data/types";

class LocalStorage {
  static getFromLocalStorage() {
    const myProducts: IProduct[] = JSON.parse(localStorage.getItem("productInCart") || "[]");
    myProducts.map((item) => (item.count = 1));
    localStorage.setItem("productInCart", JSON.stringify(myProducts));
    if (
      localStorage.getItem("productInCart") &&
      JSON.parse(localStorage.getItem("productInCart") as string).length > 0
    ) {
      const products: IProduct[] = JSON.parse(localStorage.getItem("productInCart") as string);
      products.map((item, index) => {
        return (item.orderNumber = index + 1);
      });
      return products;
    }
  }
}

export default LocalStorage;