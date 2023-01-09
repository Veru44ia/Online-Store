import { IProd } from "../../core/data/types";

class LocalStorage {
  static getFromLocalStorage() {
    const myProducts: IProd[] = JSON.parse(localStorage.getItem("productInCart") || "[]");
    myProducts.map((item) => (item.count = 1));
    localStorage.setItem("productInCart", JSON.stringify(myProducts));
    return myProducts;
  }
}

export default LocalStorage;
