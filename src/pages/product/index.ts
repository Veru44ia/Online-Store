import Page from '../../core/templates/page';
import products from '../../core/data';
import { IProduct } from '../../core/data';

class ProductPage extends Page {
  categoryCheckedArr: string[]
  brandCheckedArr: string[]

  constructor(id: string, categoryCheckedArr: string[] = [], brandCheckedArr: string[] = []) {
    super(id);
    this.categoryCheckedArr = categoryCheckedArr;
    this.brandCheckedArr = brandCheckedArr;
  }

  renderPage() {
    this.container.insertAdjacentHTML('afterbegin', `

    <div class="main-container">
    <div class="main-wrapper">
      <div class="main-container__filter">
        <div class="additional-filter__item-count">
          <p>Found <strong>300</strong> item</p>
        </div>
        <div class="main-container__filter_wrapper">
          <div class="main-container__checked-block checked-block">
            <div class="checked-block__item">
              <p class="checked-block__title">Category</p>
              <div class="checked-block__scope">
                <div id="category-filter" class="checked-block__wrapper">
                </div>
              </div>
            </div>
            <div class="checked-block__item">
              <p class="checked-block__title">Brand</p>
              <div class="checked-block__scope">
                <div id="brand-filter" class="checked-block__wrapper">
                </div>
              </div>
            </div>
          </div>
          <div class="main-container__slider-block slider-block">
            <div class="slider-block__item">
              <div class="slider-block__field">
              </div>
            </div>
          </div>
          <div class="main-container__btn-block">
            <button class="basic-btn btn-font">Reset filters</button>
            <button class="second-btn btn-font">Copy link</button>
          </div>
        </div>
      </div>
      <div class="main-container__products">
        <div class="main-container__additional-filter additional-filter">
          <div class="additional-filter__select-filter select-filter">
            <p>Сортировать по:</p>
            <select class="select-filte__select p-bold">
              <option>Популятности</option>
              <option>Рейтингу</option>
              <option>Цене max</option>
              <option>Цене min</option>
            </select>
          </div>
          <div class="additional-filter__products-grid products-grid">
            <div id="product-grid__2x2" class="products-grid__item">
              <p>2 X 2</p>
            </div>
            <div id="product-grid__3x3" class="products-grid__item">
              <p style="font-weight: 700;">3 X 3</p>
            </div>
          </div>
        </div>
        <div class="main-container__products-cards products-cards">
          <div id="cards-container" class="products-cards__cards-wrapper">
          </div>
        </div>
      </div>
    </div>
  </div>

    `)
    document.addEventListener("DOMContentLoaded", this.renderCards)
    return this.container
  }

  renderCards() {
    let cardsContainer: HTMLElement | null = document.getElementById('cards-container');
    let checkedCategory: IProduct[] = [];

    products.map(item => {

      if (this.categoryCheckedArr.length > 0 && this.brandCheckedArr.length > 0) {
        if (this.categoryCheckedArr.includes(item.category) && this.brandCheckedArr.includes(item.brand)) checkedCategory.push(item)
      }
      else if (this.categoryCheckedArr.length > 0) {
        if (this.categoryCheckedArr.includes(item.category)) checkedCategory.push(item)
      }
      else if (this.brandCheckedArr.length > 0) {
        if (this.brandCheckedArr.includes(item.brand)) checkedCategory.push(item)
      }
      else {
        checkedCategory = products;
      }
    })

    if (cardsContainer) {

      cardsContainer.innerHTML = "";
      for (let i = 0; i < checkedCategory.length; i++) {
        cardsContainer.insertAdjacentHTML('afterbegin', `
    
        <div class="products-cards__card">
          <img class="card__img" src="${checkedCategory[i].thumbnail}">
          <div class="card__info">
            <div class="card__name_brand">
              <p>${checkedCategory[i].title}</p>
              <p style="opacity: 0.5;">${checkedCategory[i].brand}</p>
            </div>
            <div class="card__price_btn">
              <h5>${checkedCategory[i].price} USD</h5>
              <button class="btn-font card-btn">Add to cart</button>
            </div>
          </div>
        </div> 
  
          `)
      }
    }
    return cardsContainer;
  }

  renderFilter(id: string, key: string) {
    let FilterContainer: HTMLElement | null = document.getElementById(id);
    let categoryArr: string[] = [];

    for (let i = 0; i < products.length; i++) {
      if (categoryArr.includes(products[i][key].toString())) {
        continue
      }
      categoryArr.push(products[i][key].toString())
    }
    if (FilterContainer) {
      for (let i = 0; i < categoryArr.length; i++) {
        FilterContainer.insertAdjacentHTML('afterbegin', `

      <div class="checked-block__checkbox">
        <input id="checkbox-${key}-${i}" type="checkbox" value="${categoryArr[i]}">
        <label class="checkbox-label" for="checkbox-${key}-${i}">
          <h6>${categoryArr[i]}</h6>
        </label>
      </div>

        `)
      }
    }

    return FilterContainer
  }

  sortingCards(id: string) {
    let checkedArr: string[] = [];
    let FilterContainer: HTMLElement | null = document.getElementById(id);

    if (FilterContainer) {
      FilterContainer.addEventListener('click', (e: Event) => {
        let targetElem = e.target as HTMLInputElement;

        if (targetElem.tagName === 'INPUT') {
          if (!checkedArr.includes(targetElem.value)) {
            checkedArr.push(targetElem.value)
          } else {
            let index = checkedArr.indexOf(targetElem.value);
            checkedArr.splice(index, 1)
          }
        };

        if (id === "category-filter") {
          this.categoryCheckedArr = checkedArr;
        } else if (id === "brand-filter") {
          this.brandCheckedArr = checkedArr
        }

        this.renderCards()
      })
    }
  }

  render() {
    this.renderPage()

    setTimeout(() => {
      this.renderCards()
      this.renderFilter('category-filter', 'category')
      this.renderFilter('brand-filter', 'brand')
      this.sortingCards('category-filter')
      this.sortingCards('brand-filter')
    }, 10)

    return this.container;
  }
}

export default ProductPage;
