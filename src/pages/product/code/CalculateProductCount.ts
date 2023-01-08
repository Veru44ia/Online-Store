import products from '../../../core/data/products';
import { URLSearchKeys } from '../../../core/data/types';
import { IProduct } from '../../../core/data/types';
import { RenderCards } from './RenderCards';

export class CalculateProductCount {
  static CountOfProductsOBJ: ICount = {};

  static setAllProductsCount(key: URLSearchKeys): ICount {
    const obj: ICount = {}

    products.forEach((item) => {
      const itemKey = key as keyof typeof item;
      const objKey = item[itemKey] as string;
      if (typeof obj[objKey] === "undefined") {
        obj[objKey] = 1
      } else {
        obj[objKey] += 1;
      }
    })
    CalculateProductCount.CountOfProductsOBJ = obj;
    return obj
  }

  static setProductsCountFromPage(key: URLSearchKeys, arr: IProduct[]) {
    const obj: ICount = {}

    arr.forEach((item) => {
      const itemKey = key as keyof typeof item;
      const objKey = item[itemKey] as string;
      if (typeof obj[objKey] === "undefined") {
        obj[objKey] = 1
      } else {
        obj[objKey] += 1;
      }
    })

    products.forEach((item: IProduct) => {
      const itemKey = key as keyof typeof item;
      const objKey = item[itemKey] as string;
      const count: HTMLElement | null = document.getElementById(`count-of-${objKey}`) as HTMLElement;
      if (count) count.innerText = `${obj[objKey] ? obj[objKey] : '0'}`
    })
  }

  static calculate() {
    CalculateProductCount.setProductsCountFromPage(URLSearchKeys.category, RenderCards.pageCardsArr)
    CalculateProductCount.setProductsCountFromPage(URLSearchKeys.brand, RenderCards.pageCardsArr)
  }
}

export interface ICount {
  [key: string]: number;
}
