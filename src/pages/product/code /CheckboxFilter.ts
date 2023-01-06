import products from '../../../core/data';
import { IProduct } from '../../../core/data';
import { RenderCards } from './RenderCards';
import { QueryParamsHandler } from './QueryParamsHandler';
import { ElementsId } from '../../../core/data';
import { URLSearchKeys } from '../../../core/data';

export class CheckboxFilter {
  static areEventListenersSet: boolean = false;
  static categoryCheckedArr: string[]
  static brandCheckedArr: string[]

  constructor(categoryCheckedArr: string[] = [], brandCheckedArr: string[] = []) {
    CheckboxFilter.categoryCheckedArr = categoryCheckedArr;
    CheckboxFilter.brandCheckedArr = brandCheckedArr;
  }

  static renderCheckbox(id: ElementsId, key: URLSearchKeys) {
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

    QueryParamsHandler.queryFilterData(key)

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

  static checkboxEvent(id: ElementsId) {
    let FilterContainer: HTMLElement | null = document.getElementById(id);

    if (FilterContainer) {
      FilterContainer.addEventListener('click', (e: Event) => {
        let targetElem = e.target as HTMLInputElement;

        if (id === ElementsId.categoryCheckbox) {
          if (targetElem.value) QueryParamsHandler.updateURL(URLSearchKeys.category, targetElem.value)
        } else if (id === ElementsId.brandCheckbox) {
          if (targetElem.value) QueryParamsHandler.updateURL(URLSearchKeys.brand, targetElem.value)
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