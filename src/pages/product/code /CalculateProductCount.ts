import products from '../../../core/data';
import { URLSearchKeys } from '../../../core/data';
import { IProduct } from '../../../core/data';
import { RenderCards } from './RenderCards';

export class calculateProductCount {
  static CountOfProductsOBJ: ICount = {};

  static setAllProductsCount(key: URLSearchKeys) {
    let obj: ICount = {}

    products.forEach((item) => {
      let itemKey = key as keyof typeof item;
      let objKey = item[itemKey] as string;
      if (typeof obj[objKey] === "undefined") {
        obj[objKey] = 1
      } else {
        obj[objKey] += 1;
      }
    })
    calculateProductCount.CountOfProductsOBJ = obj;
    return obj
  }

  static setProductsCountFromPage(key: URLSearchKeys, arr: IProduct[]) {
    let obj: ICount = {}

    arr.forEach((item) => {
      let itemKey = key as keyof typeof item;
      let objKey = item[itemKey] as string;
      if (typeof obj[objKey] === "undefined") {
        obj[objKey] = 1
      } else {
        obj[objKey] += 1;
      }
    })

    products.forEach((item) => {
      let itemKey = key as keyof typeof item;
      let objKey = item[itemKey] as string;
      let count: HTMLElement | null = document.getElementById(`count-of-${objKey}`) as HTMLElement;
      if (count) count.innerText = `${obj[objKey] ? obj[objKey] : '0'}`
    })
  }

  static render() {
    calculateProductCount.setProductsCountFromPage(URLSearchKeys.category, RenderCards.pageCardsArr)
    calculateProductCount.setProductsCountFromPage(URLSearchKeys.brand, RenderCards.pageCardsArr)
  }
}

export interface ICount {
  [key: string]: number;
}
