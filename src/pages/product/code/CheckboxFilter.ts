import products from '../../../core/data/products';
import { IProduct } from '../../../core/data/types';
import { RenderCards } from './RenderCards';
import { QueryParamsHandler } from './QueryParamsHandler';
import { ElementsId } from '../../../core/data/types';
import { URLSearchKeys } from '../../../core/data/types';
import { ProductCountCalculator } from './ProductCountCalculator';

export class CheckboxFilter {
  static areEventListenersSet = false;
  static categoryCheckedArr: string[]
  static brandCheckedArr: string[]

  constructor(categoryCheckedArr: string[] = [], brandCheckedArr: string[] = []) {
    CheckboxFilter.categoryCheckedArr = categoryCheckedArr;
    CheckboxFilter.brandCheckedArr = brandCheckedArr;
  }

  static renderCheckbox(id: ElementsId, key: URLSearchKeys) {
    const productCountCalculator = new ProductCountCalculator();
    const productCategoryCount = productCountCalculator.getProductCategoryCount(key);
    const filterContainer: HTMLElement | null = document.getElementById(id);
    const categoryParamsArr: string[] = [];

    for (let i = 0; i < products.length; i++) {
      const productParam = products[i][key];
      if (productParam !== undefined) {
        if (categoryParamsArr.includes(productParam.toString())) {
          continue
        }
        categoryParamsArr.push(productParam.toString())
      }
    }
    if (filterContainer) {
      filterContainer.innerHTML = ''
      for (let i = 0; i < categoryParamsArr.length; i++) {
        filterContainer.insertAdjacentHTML('afterbegin', `
      <div class="checked-block__checkbox">
      <input class="checkbox" id="checkbox-${key}-${i}" type="checkbox" value="${categoryParamsArr[i]}">
        <label for="checkbox-${key}-${i}">
        <div class="checkbox-label">
          <h6>${categoryParamsArr[i]}</h6>
        </div>
        </label>
        <h6 class="checkbox__product-count">(<span id="count-of-${categoryParamsArr[i]}">0</span>/${productCategoryCount[categoryParamsArr[i]]})</h6>
      </div>
        `)
      }

      QueryParamsHandler.queryFilterData(key)
      const collection: NodeListOf<HTMLInputElement> | undefined = filterContainer?.querySelectorAll('.checkbox');

      collection?.forEach(item => {
        if (id === 'category-filter') {
          for (let i = 0; i < CheckboxFilter.categoryCheckedArr.length; i++) {
            if (item.value === CheckboxFilter.categoryCheckedArr[i]) item.checked = true;
          }
        } else {
          for (let i = 0; i < CheckboxFilter.brandCheckedArr.length; i++) {
            if (item.value === CheckboxFilter.brandCheckedArr[i]) item.checked = true;
          }
        }
      })
      return filterContainer
    }
  }

  static checkboxEvent(id: ElementsId) {
    const FilterContainer: HTMLElement | null = document.getElementById(id);
    if (FilterContainer) {
      FilterContainer.addEventListener('click', (e: Event) => {
        const targetElem = e.target as HTMLInputElement;

        if (id === ElementsId.categoryCheckbox) {
          if (targetElem.value && targetElem.value.length > 0) QueryParamsHandler.updateURL(URLSearchKeys.category, targetElem.value)
        } else if (id === ElementsId.brandCheckbox) {
          if (targetElem.value && targetElem.value.length > 0) QueryParamsHandler.updateURL(URLSearchKeys.brand, targetElem.value)
        }

        RenderCards.sortCards()
      })
    }
  }

  static addEventListenerToCheckbox() {
    if (!this.areEventListenersSet) {
      this.areEventListenersSet = true;
      CheckboxFilter.checkboxEvent(ElementsId.categoryCheckbox)
      CheckboxFilter.checkboxEvent(ElementsId.brandCheckbox)
    }
  }

  static sortByCheckbox(): IProduct[] {
    QueryParamsHandler.queryFilterData(URLSearchKeys.category)
    QueryParamsHandler.queryFilterData(URLSearchKeys.brand)

    let resultCardsArr: IProduct[] = []

    products.map(item => {
      if (this.categoryCheckedArr.length > 0 && this.brandCheckedArr.length > 0) {
        if (this.categoryCheckedArr.includes(item.category) && this.brandCheckedArr.includes(item.brand)) resultCardsArr.push(item)
      }
      else if (this.categoryCheckedArr.length > 0) {
        if (this.categoryCheckedArr.includes(item.category)) resultCardsArr.push(item)
      }
      else if (this.brandCheckedArr.length > 0) {
        if (this.brandCheckedArr.includes(item.brand)) resultCardsArr.push(item)
      }
      else {
        resultCardsArr = products;
      }
    })

    return resultCardsArr
  }

  static render() {
    this.areEventListenersSet = false;
    CheckboxFilter.renderCheckbox(ElementsId.categoryCheckbox, URLSearchKeys.category)
    CheckboxFilter.renderCheckbox(ElementsId.brandCheckbox, URLSearchKeys.brand)
    CheckboxFilter.addEventListenerToCheckbox()
    CheckboxFilter.sortByCheckbox()
  }
}