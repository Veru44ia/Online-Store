import ProductItem from "..";
import { HeaderHandler } from "../../../core/components/header/code/HeaderHandler";
import products from "../../../core/data";
import { IProduct } from "../../../core/data";
import { PageIDs } from "../../../core/templates/page";
import App from "../../app";
import { CardHandler } from "../../product/code /CardHandler";

export class ProductHandler {

  static setProductStatus(obj: IProduct) {
    let BTN = document.getElementById('cart-BTN');
    let storageProducts: IProduct[] = JSON.parse(localStorage.getItem("productInCart") || "[]");
    if (storageProducts.length > 0) {
      storageProducts.forEach(item => {
        if (item.id === obj.id) {
          if (BTN) {
            BTN.innerText = 'Drop from cart'
            BTN.style.backgroundColor = '#FF6E40'
            BTN.style.color = '#191919'
            BTN.style.border = 'none'
          }
        }
      })
    }
  }

  static toggleProductsInCart(obj: IProduct) {
    let BTN: HTMLElement | null = document.getElementById('cart-BTN')

    const addProduct = (id: number, btn: HTMLElement) => {
      btn.innerText = 'Drop from cart'
      btn.style.backgroundColor = '#FF6E40'
      btn.style.color = '#191919'
      btn.style.border = 'none'
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

    if (BTN) {
      BTN.addEventListener('click', () => {
        if (BTN) {
          BTN.innerText === 'Add to cart'
            ? addProduct(obj.id, BTN)
            : removeProduct(obj.id, BTN)
          HeaderHandler.setCount()
          HeaderHandler.setPrice()
        }
      })
    }
  }

  static buyNow(obj: IProduct) {
    const BTN: HTMLDivElement | null = document.getElementById('buy-BTN') as HTMLDivElement;
    BTN?.addEventListener('click', () => {
      CardHandler.toggleProducts__localStorage(obj)
      App.renderNewPage(PageIDs.Cart)
    })
  }

  static render() {
    ProductHandler.buyNow(ProductItem.obj)
    ProductHandler.setProductStatus(ProductItem.obj)
    ProductHandler.toggleProductsInCart(ProductItem.obj)
  }
}

