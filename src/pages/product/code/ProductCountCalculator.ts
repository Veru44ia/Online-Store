import products from '../../../core/data/products';
import { URLSearchKeys } from '../../../core/data/types';
import { IProduct } from '../../../core/data/types';
import { RenderCards } from './RenderCards';

export class ProductCountCalculator {
  CountOfProductsOBJ: ICount = {};

  createProductCountObject(arr: IProduct[], key: URLSearchKeys): ICount {
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

    return obj
  }

  getProductCategoryCount(key: URLSearchKeys): ICount {
    const obj = this.createProductCountObject(products, key)
    this.CountOfProductsOBJ = obj;
    return obj
  }

  setProductsCountFromPage(key: URLSearchKeys, arr: IProduct[]) {
    const obj = this.createProductCountObject(arr, key)

    products.forEach((item: IProduct) => {
      const itemKey = key as keyof typeof item;
      const objKey = item[itemKey] as string;
      const count: HTMLElement | null = document.getElementById(`count-of-${objKey}`) as HTMLElement;
      if (count) count.innerText = `${obj[objKey] ? obj[objKey] : '0'}`
    })
  }

  calculateProductsFromPage() {
    this.setProductsCountFromPage(URLSearchKeys.category, RenderCards.pageCardsArr)
    this.setProductsCountFromPage(URLSearchKeys.brand, RenderCards.pageCardsArr)
  }
}

export interface ICount {
  [key: string]: number;
}
