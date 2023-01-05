import { RenderCards } from './render-cards';
import { QueryParams } from './query-params';
import { CardHandler } from './card-handler';
import products from '../../core/data';
import { IProduct } from '../../core/data';

export class Sort {

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
    let cardsType = QueryParams.queryFilterData('big')
    let cardsContainer: HTMLElement | null = document.getElementById('cards-container');
    let twoElemBTN = document.getElementById('product-grid__2x2') as HTMLElement;
    let threeElemBTN = document.getElementById('product-grid__3x3') as HTMLElement;

    let cardsCollection = document.querySelectorAll('.product-card__card');

    const TwoElemSwitch = () => {
      cardsContainer?.classList.add('cards-wrapper__two-elem');
      cardsCollection?.forEach(item => {
        item.classList.add('product-card__two-elem')
      })
      twoElemBTN.style.opacity = '1';
      threeElemBTN.style.opacity = '0.5';
    }

    const ThreeElemSwitch = () => {
      cardsContainer?.classList.remove('cards-wrapper__two-elem');
      cardsCollection?.forEach(item => {
        item.classList.remove('product-card__two-elem')
      })
      twoElemBTN.style.opacity = '0.5';
      threeElemBTN.style.opacity = '1';
    }

    if (cardsType === 'true') TwoElemSwitch()
    else ThreeElemSwitch()

    twoElemBTN?.addEventListener('click', () => {
      TwoElemSwitch()
      QueryParams.updateURL('big', 'true')
    })

    threeElemBTN?.addEventListener('click', () => {
      ThreeElemSwitch()
      QueryParams.updateURL('big', 'false')
    })
  }

  static renderSelector() {
    let selectWrapper: HTMLDivElement | null = document.querySelector('.select-filter');
    if (selectWrapper) selectWrapper.innerHTML = ''
    selectWrapper?.insertAdjacentHTML('afterbegin', `
      <p>Сортировать по:</p>
      <select class="select-filte__select p-bold">
        <option value="rating">Рейтингу</option>
        <option value="price">Цене</option>
      </select>
    `)
  }

  static sortBySelector(arr: IProduct[] = products.slice()) {
    let select: HTMLSelectElement | null = document.querySelector('.select-filte__select');
    let selectValue: string | null | undefined = QueryParams.queryFilterData('sort');
    if (select && selectValue) select.value = selectValue;

    const pageCardsArr = arr.slice()

    const sortByPrice = () => {
      pageCardsArr.sort((a, b) => a.price < b.price ? 1 : -1);
      RenderCards.renderCards(pageCardsArr)
    }

    const sortByRating = () => {
      pageCardsArr.sort((a, b) => a.rating < b.rating ? 1 : -1);
      RenderCards.renderCards(pageCardsArr)
    }

    const sortByOptions = () => {
      if (select?.value === 'price') {
        sortByPrice()
        QueryParams.updateURL('sort', 'price')
      } else if (select?.value === 'rating') {
        sortByRating()
        QueryParams.updateURL('sort', 'rating')
      }
      Sort.sortBySwitch()
      CardHandler.renderProducts__Cart()
    }

    const sortByOptions_RenderPage = () => {
      if (select?.value === 'price') {
        sortByPrice()
      } else if (select?.value === 'rating') {
        sortByRating()
      }
      Sort.sortBySwitch()
    }

    sortByOptions_RenderPage()

    let getValue: string;
    select?.addEventListener('change', function () {
      getValue = this.value;
      sortByOptions()
    });
  }

  static render() {
    Sort.renderCardsSwitch()
    Sort.sortBySwitch()
    Sort.renderSelector()
    Sort.sortBySelector()
  }

}