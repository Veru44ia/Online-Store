import Page from '../../core/templates/page';
import products from '../../core/data';
import { IProduct } from '../../core/data';
import { isConstructorDeclaration } from 'typescript';

class ProductPage extends Page {
  categoryCheckedArr: string[]
  brandCheckedArr: string[]

  constructor(categoryCheckedArr: string[] = [], brandCheckedArr: string[] = []) {
    super();
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
            <div id="price-slider" class="slider-block__item">
            </div>
            <div id="stock-slider" class="slider-block__item">
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

    let priceMin = (document.querySelector('.slider-block__price-range-min') as HTMLInputElement).value;
    let priceMax = (document.querySelector('.slider-block__price-range-max') as HTMLInputElement).value;

    let stockMin = (document.querySelector('.slider-block__stock-range-min') as HTMLInputElement).value;
    let stockMax = (document.querySelector('.slider-block__stock-range-max') as HTMLInputElement).value;

    checkedCategory = checkedCategory.filter(item => {
      return ((item.price <= Number(priceMax) && item.price >= Number(priceMin))
        && (item.stock <= Number(stockMax) && item.stock >= Number(stockMin)));
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

  renderSlider(index: number) {

    let min, max;
    switch (index) {
      case 0:
        min = '10';
        max = '1749'
        break;
      case 1:
        min = '1';
        max = '150'
        break;
    }

    let rangeContainer = document.getElementById(rangeContent[index].id) as HTMLElement;
    if (rangeContainer) {
      rangeContainer.innerHTML = `

      <h4 class="slider-block__title">${rangeContent[index].title}</h4>
      <div class="slider-block__numerical-difference">
        <p id="${rangeContent[index].type}-min">${min} ${rangeContent[index].symbol}</p>
        <p id="${rangeContent[index].type}-max">${max} ${rangeContent[index].symbol}</p>
      </div>
      <div class="slider-block__slider">
        <div class="slider-block__range-input">
          <input type="range" class="slider-block__${rangeContent[index].type}-range-min" min="${rangeContent[index].min}" max="${rangeContent[index].max}" value="${min}" step="1">
          <input type="range" class="slider-block__${rangeContent[index].type}-range-max" min="${rangeContent[index].min}" max="${rangeContent[index].max}" value="${max}" step="1">
        </div>
      </div>

      `
    }

    this.updateSlider(index)
  }

  updateSlider(index: number) {
    let minInput = document.querySelector(`.slider-block__${rangeContent[index].type}-range-min`) as HTMLInputElement;
    let minField = document.getElementById(`${rangeContent[index].type}-min`) as HTMLElement;

    let maxInput = document.querySelector(`.slider-block__${rangeContent[index].type}-range-max`) as HTMLInputElement;
    let maxField = document.getElementById(`${rangeContent[index].type}-max`) as HTMLElement;

    minInput.addEventListener('input', () => {
      minField.innerHTML = `${minInput.value}${rangeContent[index].symbol}`;
      this.renderCards()
    });

    maxInput.addEventListener('input', () => {
      maxField.innerHTML = `${maxInput.value}${rangeContent[index].symbol}`;
      this.renderCards()
    });

  }

  sortCards(id: string) {
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
      this.renderSlider(0)
      this.renderSlider(1)

      this.renderCards()

      this.renderFilter('category-filter', 'category')
      this.renderFilter('brand-filter', 'brand')


      this.sortCards('category-filter')
      this.sortCards('brand-filter')

    }, 10)

    return this.container;
  }
}


export interface IRangeComponents {

  [key: string]: string | number;
  type: string;
  id: string;
  title: string
  min: number;
  max: number;
  symbol: string;

}

export const rangeContent: IRangeComponents[] = [

  {
    type: 'price',
    id: 'price-slider',
    title: 'Price',
    min: 10.00,
    max: 1749.00,
    symbol: ' USD',
  },
  {
    type: 'stock',
    id: 'stock-slider',
    title: 'Stock',
    min: 1,
    max: 150,
    symbol: '',
  }

]

export default ProductPage;
