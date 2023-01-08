import ProductItem from "..";

const enum ProductElemClassTegs {
  IMGContainer = '.product-info__items',
}

export class ImgHandler {

  static createIMGItems(classTag: ProductElemClassTegs) {
    const IMGContainer: HTMLElement | null = document.querySelector(classTag);
    const maxAmountOfProductImages = 4;
    const firstImageIndex = ProductItem.obj.images.length - 1;
    const lastImageIndex = ProductItem.obj.images.length - maxAmountOfProductImages;
    for (let i = firstImageIndex; i >= lastImageIndex; i--) {
      if (ProductItem.obj.images[i]) {
        IMGContainer?.insertAdjacentHTML('afterbegin', `
        <img class="product-info__item" src="${ProductItem.obj.images[i]}">
        `)
      }
    }
  }

  static changeImg() {
    const IMGContainer: HTMLElement | null = document.querySelector('.product-info__items');
    const mainIMG: HTMLElement | null = document.getElementById('main-img');
    IMGContainer?.addEventListener('click', (e: Event) => {
      const targetElem = e.target as HTMLImageElement;
      if (targetElem.tagName == "IMG") {
        const SRC: string | null = targetElem.getAttribute('src');
        if (SRC) mainIMG?.setAttribute('src', SRC)
      }
    })
  }

  static render() {
    ImgHandler.createIMGItems(ProductElemClassTegs.IMGContainer)
    ImgHandler.changeImg()
  }
}