import { RenderCards } from './RenderCards';
import { QueryParamsHandler } from './QueryParamsHandler';

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

  static sortBySwitch() {
    let cardsType = QueryParamsHandler.queryFilterData('big')
    let twoElemBTN = document.getElementById('product-grid__2x2') as HTMLElement;
    let threeElemBTN = document.getElementById('product-grid__3x3') as HTMLElement;

    if (cardsType === 'true') Sort.switchCardSize(true)
    else Sort.switchCardSize(false)

    if (!Sort.isSwitchEventListenerAdded) {
      Sort.isSwitchEventListenerAdded = true;

      twoElemBTN?.addEventListener('click', () => {
        Sort.switchCardSize(true)
        QueryParamsHandler.updateURL('big', 'true')
      })
      threeElemBTN?.addEventListener('click', () => {
        Sort.switchCardSize(false)
        QueryParamsHandler.updateURL('big', 'false')
      })
    }
  }

  static switchCardSize(isSmall: boolean) {
    let cardsCollection = document.querySelectorAll('.product-card__card');
    let twoElemBTN = document.getElementById('product-grid__2x2') as HTMLElement;
    let threeElemBTN = document.getElementById('product-grid__3x3') as HTMLElement;
    let cardsContainer: HTMLElement | null = document.getElementById('cards-container');

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
          <select class="select-filte__select p-bold">
            <option value="alphabetA">Alphabet (A-Z)</option>
            <option value="alphabetZ">Alphabet (Z-A)</option>
            <option value="price-min">Price (min)</option>
            <option value="price-max">Price (max)</option>
          </select>
        `)
      } else {
        let select: HTMLSelectElement | null = document.querySelector('.select-filte__select');
        if (select) select.value = 'alphabetA'
      }
    }
  }

  static sortBySelector() {
    let select: HTMLSelectElement | null = document.querySelector('.select-filte__select');
    let selectValue: string | null | undefined = QueryParamsHandler.queryFilterData('sort');
    if (select && selectValue) select.value = selectValue;

    if (selectValue) Sort.sortByOptions(selectValue)

    if (!Sort.isSelectorEventListenerAdded) {
      Sort.isSelectorEventListenerAdded = true;
      select?.addEventListener('change', function () {
        if (select) {
          Sort.sortByOptions(select.value)
          QueryParamsHandler.updateURL('sort', select.value)
        }
      });
    }
  }

  static sortByOptions(param: string | null) {
    const pageCardsArr = RenderCards.pageCardsArr.slice();
    if (param === null) pageCardsArr.sort((a, b) => a.price < b.price ? 1 : -1);
    if (param === 'price-min') pageCardsArr.sort((a, b) => a.price < b.price ? 1 : -1);
    if (param === 'price-max') pageCardsArr.sort((a, b) => a.price > b.price ? 1 : -1);
    if (param === 'alphabetA') pageCardsArr.sort((a, b) => a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase() ? 1 : -1);
    if (param === 'alphabetZ') pageCardsArr.sort((a, b) => a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase() ? 1 : -1);

    RenderCards.renderCards(pageCardsArr)
    Sort.sortBySwitch()
  }

  static render() {
    Sort.isSwitchEventListenerAdded = false;
    Sort.isSelectorEventListenerAdded = false;

    Sort.renderCardsSwitch()
    Sort.sortBySwitch()
    Sort.renderSelector()
    Sort.sortBySelector()
  }
}