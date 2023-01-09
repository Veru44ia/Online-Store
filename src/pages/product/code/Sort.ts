import { RenderCards } from './RenderCards';
import { QueryParamsHandler } from './QueryParamsHandler';
import { ElementsId } from '../../../core/data/types';
import { URLSearchKeys } from '../../../core/data/types';
import { SelectorParams } from '../../../core/data/types';
import { CardHandler } from './CardHandler';

export class Sort {
  static isSwitchEventListenerAdded = false;
  static isSelectorEventListenerAdded = false;

  static renderCardsSwitch() {
    const typesWrapper: HTMLElement | null = document.querySelector('.products-grid');
    if (typesWrapper) typesWrapper.innerHTML = ''
    typesWrapper?.insertAdjacentHTML('afterbegin', `
    <div style="opacity: 0.5" id="product-grid__2x2" class="products-grid__item">
      <p>▪▪</p>
    </div>
    <div id="product-grid__3x3" class="products-grid__item">
      <p>▪▪▪</p>
    </div>
    `)
  }

  static sortBySwitch(id?: ElementsId) {
    const cardsType = QueryParamsHandler.queryFilterData(URLSearchKeys.switch)
    let ElemBTN: HTMLElement | null = null;
    if (id !== undefined) ElemBTN = document.getElementById(id);

    if (cardsType === 'true') Sort.switchCardSize(true)
    else Sort.switchCardSize(false)

    if (ElemBTN) {
      if (ElementsId.switchTwoElemBTN === id) {
        ElemBTN.addEventListener('click', () => {
          Sort.switchCardSize(true)
          QueryParamsHandler.updateURL(URLSearchKeys.switch, 'true')
        })
      } else if (ElementsId.switchThreeElemBTN === id) {
        ElemBTN.addEventListener('click', () => {
          Sort.switchCardSize(false)
          QueryParamsHandler.updateURL(URLSearchKeys.switch, 'false')
        })
      }
    }
  }

  static addEventListenerToSwitch() {
    if (!Sort.isSwitchEventListenerAdded) {
      Sort.isSwitchEventListenerAdded = true;

      Sort.sortBySwitch(ElementsId.switchTwoElemBTN);
      Sort.sortBySwitch(ElementsId.switchThreeElemBTN);
    }
  }

  static switchCardSize(isSmall: boolean) {
    const cardsCollection = document.querySelectorAll('.product-card__card');
    const twoElemBTN: HTMLElement = document.getElementById(ElementsId.switchTwoElemBTN) as HTMLElement;
    const threeElemBTN: HTMLElement = document.getElementById(ElementsId.switchThreeElemBTN) as HTMLElement;
    const cardsContainer: HTMLElement | null = document.getElementById(ElementsId.cardsContainer);

    if (isSmall) cardsContainer?.classList.add('cards-wrapper__two-elem')
    else cardsContainer?.classList.remove('cards-wrapper__two-elem');
    cardsCollection?.forEach(item => {
      if (isSmall) item.classList.add('product-card__two-elem')
      else item.classList.remove('product-card__two-elem');
    })
    if (twoElemBTN) twoElemBTN.style.opacity = isSmall ? '1' : '0.5';
    if (threeElemBTN) threeElemBTN.style.opacity = isSmall ? '0.5' : '1';
  }

  static renderSelector() {
    const selectWrapper: HTMLDivElement | null = document.querySelector('.select-filter');
    if (selectWrapper) {
      if (selectWrapper.childElementCount === 0) {
        selectWrapper.innerHTML = ''
        selectWrapper?.insertAdjacentHTML('afterbegin', `
          <p>Sort by:</p>
          <select id="select" class="select-filter__select p-bold">
            <option value="${SelectorParams.alphabetAZ}">Alphabet (A-Z)</option>
            <option value="${SelectorParams.alphabetZA}">Alphabet (Z-A)</option>
            <option value="${SelectorParams.priceMin}">Price (min)</option>
            <option value="${SelectorParams.priceMax}">Price (max)</option>
          </select>
        `)
      } else {
        const select: HTMLSelectElement | null = document.getElementById(ElementsId.selectotElem) as HTMLSelectElement;
        select.value = SelectorParams.alphabetAZ
      }
    }
  }

  static sortBySelector() {
    const select: HTMLSelectElement | null = document.getElementById(ElementsId.selectotElem) as HTMLSelectElement;
    const selectValue: string | null | undefined = QueryParamsHandler.queryFilterData(URLSearchKeys.selector);
    if (selectValue != null && select) select.value = selectValue;

    if (selectValue === null || (selectValue != null)) Sort.sortByOptions(selectValue)

    if (!this.isSelectorEventListenerAdded) {
      this.isSelectorEventListenerAdded = true;
      select?.addEventListener('change', function () {
        Sort.sortByOptions(select.value)
        QueryParamsHandler.updateURL(URLSearchKeys.selector, select.value)
      });
    }
  }

  static sortByOptions(param: string | null) {
    const pageCardsArr = RenderCards.pageCardsArr.slice();
    if (param === null) pageCardsArr.sort((a, b) => a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase() ? 1 : -1);
    if (param === SelectorParams.priceMin) pageCardsArr.sort((a, b) => a.price < b.price ? 1 : -1);
    if (param === SelectorParams.priceMax) pageCardsArr.sort((a, b) => a.price > b.price ? 1 : -1);
    if (param === SelectorParams.alphabetAZ) pageCardsArr.sort((a, b) => a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase() ? 1 : -1);
    if (param === SelectorParams.alphabetZA) pageCardsArr.sort((a, b) => a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase() ? 1 : -1);

    RenderCards.renderCards(pageCardsArr)
    Sort.sortBySwitch()
    CardHandler.renderProducts__Cart()
  }

  static render() {
    Sort.isSwitchEventListenerAdded = false;
    Sort.isSelectorEventListenerAdded = false;

    Sort.renderCardsSwitch()
    Sort.addEventListenerToSwitch()
    Sort.renderSelector()
    Sort.sortBySelector()
  }
}