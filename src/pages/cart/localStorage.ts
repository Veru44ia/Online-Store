import { IProd } from "../../core/data/types";

class LocalStorage {
  static getFromLocalStorage() {
    const myProducts: IProd[] = JSON.parse(localStorage.getItem("productInCart") || "[]");
    return myProducts;
  }
}

export default LocalStorage;
