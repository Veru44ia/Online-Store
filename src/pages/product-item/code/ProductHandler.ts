import ProductItem from "..";
import { HeaderHandler } from "../../../core/components/header/code/HeaderHandler";
import products from "../../../core/data/products";
import { IProduct } from "../../../core/data/types";
import { CardHandler } from "../../product/code/CardHandler";
import { ProductElemID } from "./ProductPageHandler";
import Modal from "../../../core/components/modal/modal";
import { PageIDs } from "../../../core/templates/page";
import App from "../../app";

export class ProductHandler {
  static modal = new Modal("modal-container");

  private static setButtonParamsForActiveProduct(btn: HTMLElement | null) {
    if (btn) {
      btn.innerText = 'Drop from cart'
      btn.style.backgroundColor = '#FF6E40'
      btn.style.color = '#191919'
      btn.style.border = 'none'
    }
  }

  static setProductStatus(obj: IProduct, id: ProductElemID) {
    const cartBTN = document.getElementById(id);
    const storageProducts: IProduct[] = JSON.parse(localStorage.getItem("productInCart") || "[]");
    if (storageProducts.length > 0) {
      storageProducts.forEach(item => {
        if (item.id === obj.id) {
          this.setButtonParamsForActiveProduct(cartBTN)
        }
      })
    }
  }

  static toggleProductsInCart(obj: IProduct, id: ProductElemID) {
    const cartButton: HTMLElement | null = document.getElementById(id)

    const addProduct = (id: number, btn: HTMLElement) => {
      this.setButtonParamsForActiveProduct(btn)
      for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
          CardHandler.toggleProducts__localStorage(products[i])
          break
        }
      }
    }

    const removeProduct = (id: number, btn: HTMLElement) => {
      btn.innerText = 'Add to cart'
      btn.removeAttribute("style")
      for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
          CardHandler.toggleProducts__localStorage(products[i])
          break
        }
      }
    }

    if (cartButton) {
      cartButton.addEventListener('click', () => {
        if (cartButton) {
          cartButton.innerText === 'Add to cart'
            ? addProduct(obj.id, cartButton)
            : removeProduct(obj.id, cartButton)
          HeaderHandler.setCount()
          HeaderHandler.setPrice()
        }
      })
    }
  }

  static buyNow(obj: IProduct, id: ProductElemID) {
    const storageProducts = HeaderHandler.getLocalStorageArr()
    const buyButton: HTMLDivElement | null = document.getElementById(id) as HTMLDivElement;

    buyButton?.addEventListener('click', () => {
      if (storageProducts === null) {
        const arr: IProduct[] = [];
        obj.count = 1;
        arr.push(obj)
        localStorage.setItem('productInCart', JSON.stringify(arr));
      } else {
        const findObj = storageProducts.find(item => item.id === obj.id)
        const resultArr = storageProducts.slice()
        if (!findObj) {
          obj.count = 1;
          resultArr.push(obj);
        }
        localStorage.setItem('productInCart', JSON.stringify(resultArr));
      }
      App.renderNewPage(PageIDs.Cart);
      const hash = `#${PageIDs.Cart}`;
      history.pushState(null, '', hash);
      HeaderHandler.setCount()
      HeaderHandler.setPrice()
      ProductHandler.modal.openModalforProductPage()
    })
  }

  static render() {
    ProductHandler.setProductStatus(ProductItem.obj, ProductElemID.CartBTN)
    ProductHandler.toggleProductsInCart(ProductItem.obj, ProductElemID.CartBTN)
    ProductHandler.buyNow(ProductItem.obj, ProductElemID.BuyBTN)
  }
}

