import { RenderCards } from './RenderCards';
import { QueryParamsHandler } from './QueryParamsHandler';
import { ElementsId } from '../../../core/data';
import { URLSearchKeys } from '../../../core/data';
import { SelectorParams } from '../../../core/data';

export class Sort {
  static isSwitchEventListenerAdded: boolean = false;
  static isSelectorEventListenerAdded: boolean = false;

  static renderCardsSwitch() {
    let typesWrapper: HTMLElement | null = document.querySelector('.products-grid');
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
    let cardsType = QueryParamsHandler.queryFilterData(URLSearchKeys.switch)
    let ElemBTN: HTMLElement | null = null;
    if (id) ElemBTN = document.getElementById(id);

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
    let cardsCollection = document.querySelectorAll('.product-card__card');
    let twoElemBTN = document.getElementById(ElementsId.switchTwoElemBTN) as HTMLElement;
    let threeElemBTN = document.getElementById(ElementsId.switchThreeElemBTN) as HTMLElement;
    let cardsContainer: HTMLElement | null = document.getElementById(ElementsId.cardsContainer);

    if (isSmall) cardsContainer?.classList.add('cards-wrapper__two-elem')
    else cardsContainer?.classList.remove('cards-wrapper__two-elem');
    cardsCollection?.forEach(item => {
      if (isSmall) item.classList.add('product-card__two-elem')
      else item.classList.remove('product-card__two-elem');
    })
    twoElemBTN.style.opacity = isSmall ? '1' : '0.5';
    threeElemBTN.style.opacity = isSmall ? '0.5' : '1';
  }

  static renderSelector() {
    let selectWrapper: HTMLDivElement | null = document.querySelector('.select-filter');
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
        let select: HTMLSelectElement | null = document.getElementById(ElementsId.selectotElem) as HTMLSelectElement;
        if (select) select.value = SelectorParams.alphabetAZ
      }
    }
  }

  static sortBySelector() {
    let select: HTMLSelectElement | null = document.getElementById(ElementsId.selectotElem) as HTMLSelectElement;
    let selectValue: string | null | undefined = QueryParamsHandler.queryFilterData(URLSearchKeys.selector);
    if (select && selectValue) select.value = selectValue;

    if (selectValue) Sort.sortByOptions(selectValue)

    if (!this.isSelectorEventListenerAdded) {
      this.isSelectorEventListenerAdded = true;
      select?.addEventListener('change', function () {
        if (select) {
          Sort.sortByOptions(select.value)
          QueryParamsHandler.updateURL(URLSearchKeys.selector, select.value)
        }
      });
    }
  }

  static sortByOptions(param: string | null) {
    const pageCardsArr = RenderCards.pageCardsArr.slice();
    if (param === null) pageCardsArr.sort((a, b) => a.price < b.price ? 1 : -1);
    if (param === SelectorParams.priceMin) pageCardsArr.sort((a, b) => a.price < b.price ? 1 : -1);
    if (param === SelectorParams.priceMax) pageCardsArr.sort((a, b) => a.price > b.price ? 1 : -1);
    if (param === SelectorParams.alphabetAZ) pageCardsArr.sort((a, b) => a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase() ? 1 : -1);
    if (param === SelectorParams.alphabetZA) pageCardsArr.sort((a, b) => a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase() ? 1 : -1);

    RenderCards.renderCards(pageCardsArr)
    Sort.sortBySwitch()
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