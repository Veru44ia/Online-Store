import products from '../../../core/data';
import { IProduct } from '../../../core/data';
import { RenderCards } from './RenderCards';
import { QueryParamsHandler } from './QueryParamsHandler';

export class CheckboxFilter {

  static categoryCheckedArr: string[]
  static brandCheckedArr: string[]

  constructor(categoryCheckedArr: string[] = [], brandCheckedArr: string[] = []) {
    CheckboxFilter.categoryCheckedArr = categoryCheckedArr;
    CheckboxFilter.brandCheckedArr = brandCheckedArr;
  }

  static renderCheckbox(id: string, key: string) {
    let FilterContainer: HTMLElement | null = document.getElementById(id);
    let categoryArr: string[] = [];

    for (let i = 0; i < products.length; i++) {
      if (categoryArr.includes(products[i][key].toString())) {
        continue
      }
      categoryArr.push(products[i][key].toString())
    }
    if (FilterContainer) {
      FilterContainer.innerHTML = ''
      for (let i = 0; i < categoryArr.length; i++) {
        FilterContainer.insertAdjacentHTML('afterbegin', `
      <div class="checked-block__checkbox">
      <input class="checkbox" id="checkbox-${key}-${i}" type="checkbox" value="${categoryArr[i]}">
        <label class="checkbox-label" for="checkbox-${key}-${i}">
          <h6>${categoryArr[i]}</h6>
        </label>
      </div>
        `)
      }
    }

    QueryParamsHandler.queryFilterData('category')
    QueryParamsHandler.queryFilterData('brand')

    let collection: NodeListOf<HTMLInputElement> | undefined = FilterContainer?.querySelectorAll('.checkbox');

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

    return FilterContainer
  }

  static checkboxEvent(id: string) {
    let FilterContainer: HTMLElement | null = document.getElementById(id);

    if (FilterContainer) {
      FilterContainer.addEventListener('click', (e: Event) => {
        let targetElem = e.target as HTMLInputElement;

        if (id === "category-filter") {
          if (targetElem.value) QueryParamsHandler.updateURL('category', targetElem.value)
        } else if (id === "brand-filter") {
          if (targetElem.value) QueryParamsHandler.updateURL('brand', targetElem.value)
        }

        RenderCards.sortCards()
      })
    }
  }

  static sortByCheckbox(): IProduct[] {
    QueryParamsHandler.queryFilterData('category')
    QueryParamsHandler.queryFilterData('brand')

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
    CheckboxFilter.renderCheckbox('category-filter', 'category')
    CheckboxFilter.renderCheckbox('brand-filter', 'brand')
    this.checkboxEvent('category-filter')
    this.checkboxEvent('brand-filter')

    CheckboxFilter.sortByCheckbox()
  }
}