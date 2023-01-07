import { IProduct } from '../../../core/data';
import products from '../../../core/data';
import { ElementsId } from '../../../core/data';

export class CardHandler {

  constructor() { }

  static renderProducts__Cart() {
    let productCards = document.querySelectorAll('.product-card__card');
    let storageProducts__String: string | null = localStorage.getItem('productInCart')
    let storageProducts: IProduct[] = []
    if (storageProducts__String) storageProducts = JSON.parse(storageProducts__String);
    if (storageProducts.length > 0) {
      productCards.forEach(item => {
        let BTN: HTMLElement | null = item.querySelector('.card-btn');
        let ID = Number(BTN?.getAttribute('number'));
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
    let cardsContainer: HTMLElement | null = document.getElementById(ElementsId.cardsContainer)

    const addProduct = (id: number, btn: HTMLButtonElement) => {
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

    const removeProduct = (id: number, btn: HTMLButtonElement) => {
      btn.innerText = 'Add to cart'
      btn.removeAttribute("style")
      for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
          CardHandler.toggleProducts__localStorage(products[i])
          break
        }
      }
    }

    if (cardsContainer) {
      cardsContainer.addEventListener('click', (e: Event) => {
        let targetElem = e.target as HTMLButtonElement;
        if (targetElem.tagName === "BUTTON") {
          let cardID: number = Number(targetElem.getAttribute('number'));
          targetElem.innerText === 'Add to cart'
            ? addProduct(cardID, targetElem)
            : removeProduct(cardID, targetElem)
        }
      })
    }
  }

  static toggleProducts__localStorage(obj: IProduct) {
    if (localStorage.getItem('productInCart') === null) {
      let arr: IProduct[] = [];
      arr.push(obj)
      localStorage.setItem('productInCart', JSON.stringify(arr));
    } else {
      let savedArr__String: string | null = localStorage.getItem('productInCart')
      if (savedArr__String) {
        let savedArr: IProduct[] = JSON.parse(savedArr__String);
        let firstLength = savedArr.length;
        let resultArr = savedArr.filter(item => item.id !== obj.id)
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