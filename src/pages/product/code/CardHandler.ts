import { IProduct } from '../../../core/data/types';
import products from '../../../core/data/products';
import { ElementsId } from '../../../core/data/types';

export class CardHandler {

  static renderProducts__Cart() {
    const productCards = document.querySelectorAll('.product-card__card');
    const storageProducts__String: string | null = localStorage.getItem('productInCart')
    let storageProducts: IProduct[] = []
    if (storageProducts__String != null) storageProducts = JSON.parse(storageProducts__String);
    if (storageProducts.length > 0) {
      productCards.forEach(item => {
        const BTN: HTMLElement | null = item.querySelector('.card-btn');
        const ID = Number(BTN?.getAttribute('number'));
        for (let i = 0; i < storageProducts.length; i++) {
          if (storageProducts[i].id === ID) {
            if (BTN) {
              BTN.innerText = 'Drop from cart'
              BTN.style.backgroundColor = '#FF6E40'
              BTN.style.color = '#191919'
              BTN.style.border = 'none'
            }
            break
          }
        }
      })
    }
  }

  toggleProducts__Cart() {
    const cardsContainer: HTMLElement | null = document.getElementById(ElementsId.cardsContainer)

    const addProduct = (id: number, btn: HTMLButtonElement) => {
      btn.innerText = 'Drop from cart'
      btn.style.backgroundColor = '#FF6E40'
      btn.style.color = '#191919'
      btn.style.border = 'none'
      for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
          this.toggleProducts__localStorage(products[i])
          break
        }
      }
    }

    const removeProduct = (id: number, btn: HTMLButtonElement) => {
      btn.innerText = 'Add to cart'
      btn.removeAttribute("style")
      for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
          this.toggleProducts__localStorage(products[i])
          break
        }
      }
    }

    if (cardsContainer) {
      cardsContainer.addEventListener('click', (e: Event) => {
        const targetElem = e.target as HTMLButtonElement;
        if (targetElem.tagName === "BUTTON") {
          const cardID = Number(targetElem.getAttribute('number'));
          targetElem.innerText === 'Add to cart'
            ? addProduct(cardID, targetElem)
            : removeProduct(cardID, targetElem)
        }
      })
    }
  }

  toggleProducts__localStorage(obj: IProduct) {
    if (localStorage.getItem('productInCart') === null) {
      const arr: IProduct[] = [];
      arr.push(obj)
      localStorage.setItem('productInCart', JSON.stringify(arr));
    } else {
      const savedArr__String: string | null = localStorage.getItem('productInCart')
      if (savedArr__String != null) {
        const savedArr: IProduct[] = JSON.parse(savedArr__String);
        const firstLength = savedArr.length;
        const resultArr = savedArr.filter(item => item.id !== obj.id)
        if (firstLength === resultArr.length) resultArr.push(obj)
        localStorage.setItem('productInCart', JSON.stringify(resultArr));
      }
    }
  }

  render() {
    CardHandler.renderProducts__Cart()
    this.toggleProducts__Cart()
  }
}