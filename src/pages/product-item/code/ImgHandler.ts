import ProductItem from "..";

export class ImgHandler {
  static createIMGItems() {
    let IMGContainer: HTMLElement | null = document.querySelector('.product-info__items');
    for (let i = ProductItem.obj.images.length - 1; i >= ProductItem.obj.images.length - 4; i--) {
      if (ProductItem.obj.images[i]) {
        IMGContainer?.insertAdjacentHTML('afterbegin', `
        <img class="product-info__item" src="${ProductItem.obj.images[i]}">
        `)
      }
    }
  }

  static changeImg() {
    let IMGContainer: HTMLElement | null = document.querySelector('.product-info__items');
    let mainIMG: HTMLElement | null = document.getElementById('main-img');
    IMGContainer?.addEventListener('click', (e: Event) => {
      let targetElem = e.target as HTMLImageElement;
      if (targetElem.tagName == "IMG") {
        let SRC: string | null = targetElem.getAttribute('src');
        if (SRC) mainIMG?.setAttribute('src', SRC)
      }
    })
  }

  static render() {
    ImgHandler.createIMGItems()
    ImgHandler.changeImg()
  }
}