import { IProduct } from '../../../core/data';
import { RenderCards } from './RenderCards';
import { QueryParamsHandler } from './QueryParamsHandler';
import { URLSearchKeys } from '../../../core/data';

export class SearchFilter {

  static renderSearchValue() {
    let searchInput: HTMLInputElement | null = document.querySelector('.header-container__search-input')
    let searchValue: string | null | undefined = QueryParamsHandler.queryFilterData(URLSearchKeys.search)
    if (searchInput) searchInput.value = ''
    if (searchInput && searchValue) searchInput.value = searchValue
  }

  static searchEvent() {
    let searchInput: HTMLInputElement | null = document.querySelector('.header-container__search-input');

    const search = () => {
      let searchValue: string | undefined = searchInput?.value.toLowerCase();
      if (searchValue != undefined) QueryParamsHandler.updateURL(URLSearchKeys.search, searchValue)
      RenderCards.sortCards()
    }

    if (searchInput) searchInput.oninput = () => search()

  }

  static sortBySearch(arr: IProduct[] = RenderCards.pageCardsArr): IProduct[] {
    let searchValue = QueryParamsHandler.queryFilterData(URLSearchKeys.search)

    const sort = (text: string | undefined) => {
      let resultCardsArr: IProduct[] | null = []
      arr.forEach(item => {
        let arrValues = Object.values(item).slice(1, Object.values(item).length - 2)
        for (let i = 0; i < arrValues.length; i++) {
          if (text) {
            if (arrValues[i].toString().toLowerCase().includes(text)) {
              resultCardsArr?.push(item)
              break
            }
          }
        }
      })
      return resultCardsArr
    }

    if (searchValue) return sort(searchValue)

    return arr;
  }

  static render() {
    this.renderSearchValue();
    this.searchEvent()
    this.sortBySearch()
  }
}