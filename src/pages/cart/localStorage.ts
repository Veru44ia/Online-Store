import { IProd } from "../../core/data/types";

class LocalStorage {
  static getFromLocalStorage() {
    const myProducts: IProd[] = JSON.parse(localStorage.getItem("productInCart") || "[]");
    myProducts.map((item) => (item.count = 1));
    localStorage.setItem("productInCart", JSON.stringify(myProducts));
    if (
      localStorage.getItem("productInCart") &&
      JSON.parse(localStorage.getItem("productInCart") as string).length > 0
    ) {
      const products: IProd[] = JSON.parse(localStorage.getItem("productInCart") as string);
      products.map((item, index) => {
        return (item.orderNumber = index + 1);
      });
      return products;
    }
  }
}

export default LocalStorage;
