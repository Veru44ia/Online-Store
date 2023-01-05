import { CheckboxFilter } from './checkbox';
import { SliderFilter } from './slider';
import { SearchFilter } from './search';
import { Sort } from './sort';
import { CardHandler } from './card-handler';
import { IProduct } from '../../core/data';
import { Buttons } from '../../core/components/header';
import products from '../../core/data';
import { MainPage__Buttons } from './buttons';

export class RenderCards {
  static pageCardsArr: IProduct[]

  constructor(pageCardsArr: IProduct[] = products.slice()) {
    RenderCards.pageCardsArr = pageCardsArr;
  }

  static sortCards() {
    let checkedCategory: IProduct[] = [];

    checkedCategory = CheckboxFilter.sortByCheckbox().slice()
    checkedCategory = SliderFilter.sortBySlider(checkedCategory).slice()
    checkedCategory = SearchFilter.sortBySearch(checkedCategory).slice()

    this.pageCardsArr = checkedCategory.slice()

    this.renderCards(checkedCategory)
    Sort.sortBySelector(this.pageCardsArr)
    Sort.sortBySwitch()
    CardHandler.renderProducts__Cart()
  }

  static renderCards(arr: IProduct[]) {
    let cardsContainer: HTMLElement | null = document.getElementById('cards-container');
    if (cardsContainer) {
      cardsContainer.innerHTML = "";

      if (arr.length === 0) cardsContainer.insertAdjacentHTML('afterbegin', `
      <div class="product-card__no-products">        
        <h1>No products found</h1>
      </div>
      `)

      for (let i = 0; i < arr.length; i++) {
        cardsContainer.insertAdjacentHTML('afterbegin', `
          <div class="product-card__card">
          <a href="#${Buttons[2].id}/${arr[i].id}">
            <img class="card__img" src="${arr[i].thumbnail}">
            </a>
            <div class="card__info">
              <div class="card__name_brand">
                <p>${arr[i].title} </p>
                    <p style="opacity: 0.5;"> ${arr[i].brand} </p>
              </div>
              <div class="card__price_btn">
                <h5>${arr[i].price} USD </h5>
                    <button number="${arr[i].id}" class="btn-font card-btn"> Add to cart </button>
              </div>
            </div>
          </div>
          `)
      }
    }

    const ProductCount = (el: HTMLElement | null) => {
      let countText: HTMLElement | null = document.getElementById('products-count');
      let productsCount = el?.childElementCount;
      if (countText) {
        arr.length === 0
          ? countText.innerHTML = `Found <strong> 0 </strong> items`
          : countText.innerHTML = `Found <strong> ${productsCount} </strong> items`
      }
    }

    ProductCount(cardsContainer)

    return cardsContainer;
  }

  static renderPageElements() {
    CheckboxFilter.renderCheckbox('category-filter', 'category')
    CheckboxFilter.renderCheckbox('brand-filter', 'brand')
    SliderFilter.renderSlider(0)
    SliderFilter.renderSlider(1)
    SearchFilter.renderSearchValue()
    RenderCards.sortCards()
  }

  onpopstateEvent() {
    window.onpopstate = (event) => {
      RenderCards.renderPageElements()
    }
  }

  render() {
    CheckboxFilter.render()
    SliderFilter.render()
    SearchFilter.render()
    Sort.render()
    MainPage__Buttons.render()
    RenderCards.sortCards()

    this.onpopstateEvent()
  }
}
