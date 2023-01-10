import { IProduct } from '../../../core/data/types';
import { RenderCards } from './RenderCards';
import { QueryParamsHandler } from './QueryParamsHandler';
import { URLSearchKeys } from '../../../core/data/types';

export class SearchFilter {

  static renderSearchValue() {
    const searchInput: HTMLInputElement | null = document.querySelector('.header-container__search-input')
    const searchValue: string | null | undefined = QueryParamsHandler.queryFilterData(URLSearchKeys.search)
    if (searchInput) searchInput.value = ''
    if (searchInput && (searchValue != null)) searchInput.value = searchValue
  }

  static searchEvent() {
    const searchInput: HTMLInputElement | null = document.querySelector('.header-container__search-input');

    const search = () => {
      const searchValue: string | undefined = searchInput?.value.toLowerCase();
      if (searchValue != undefined) QueryParamsHandler.updateURL(URLSearchKeys.search, searchValue)
      RenderCards.sortCards()
    }

    if (searchInput) searchInput.oninput = () => search()

  }

  static sortBySearch(arr: IProduct[] = RenderCards.pageCardsArr): IProduct[] {
    const searchValue = QueryParamsHandler.queryFilterData(URLSearchKeys.search)

    const sort = (text: string | undefined) => {
      const resultCardsArr: IProduct[] | null = []
      arr.forEach(item => {
        const arrValues = Object.values(item).slice(1, Object.values(item).length - 2)
        for (let i = 0; i < arrValues.length; i++) {
          if (text != null) {
            const arrParam = arrValues[i];
            if (arrParam !== undefined) {
              if (arrParam.toString().toLowerCase().includes(text)) {
                resultCardsArr?.push(item)
                break
              }
            }
          }
        }
      })
      return resultCardsArr
    }

    if (searchValue != null) return sort(searchValue)

    return arr;
  }

  static render() {
    this.renderSearchValue();
    this.searchEvent()
    this.sortBySearch()
  }
}