import Page from '../../core/templates/page';
import products from '../../core/data';
import { IProduct } from '../../core/data';

class MainPage extends Page {
  content: string;

  constructor() {
    super();
    this.content = `
    <div class="main-container">
    <div class="main-wrapper">
      <div class="main-container__filter">
        <div class="main-container__products-count">
          <p id="products-count">Found <strong>300</strong> items</p>
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
            <button id="reset-BTN"class="basic-btn btn-font">Reset filters</button>
            <button id="copy-BTN" class="second-btn btn-font">Copy link</button>
          </div>
        </div>
      </div>
      <div class="main-container__products">
        <div class="main-container__additional-filter additional-filter">
          <div class="additional-filter__select-filter select-filter">
          </div>
          <div class="additional-filter__products-grid products-grid">

          </div>
        </div>
        <div class="main-container__products-cards products-cards">
          <div id="cards-container" class="products-cards__cards-wrapper">
          </div>
        </div>
      </div>
    </div>
  </div>
    `
  }

  render() {
    return super.render()
  }
}

export class Filter {
  categoryCheckedArr: string[]
  brandCheckedArr: string[]
  pageCardsArr: IProduct[]

  constructor(categoryCheckedArr: string[] = [], brandCheckedArr: string[] = [], pageCardsArr: IProduct[] = products.slice()) {
    this.categoryCheckedArr = categoryCheckedArr;
    this.brandCheckedArr = brandCheckedArr;
    this.pageCardsArr = pageCardsArr;
  }

  sortCards() {
    let checkedCategory: IProduct[] = [];

    checkedCategory = this.sortByCheckbox().slice()
    checkedCategory = this.sortBySlider(checkedCategory).slice()
    checkedCategory = this.sortBySearch(checkedCategory).slice()

    this.pageCardsArr = checkedCategory.slice()
    this.renderCards(checkedCategory)
    this.sortBySelector()
    this.sortBySwitch()
    CardHandler.renderProducts__Cart()
  }




  renderCheckbox(id: string, key: string) {
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

    this.queryFilterData('category')
    this.queryFilterData('brand')

    let collection: NodeListOf<HTMLInputElement> | undefined = FilterContainer?.querySelectorAll('.checkbox');

    collection?.forEach(item => {
      if (id === 'category-filter') {
        for (let i = 0; i < this.categoryCheckedArr.length; i++) {
          if (item.value === this.categoryCheckedArr[i]) item.checked = true;
        }
      } else {
        for (let i = 0; i < this.brandCheckedArr.length; i++) {
          if (item.value === this.brandCheckedArr[i]) item.checked = true;
        }
      }
    })

    return FilterContainer
  }

  checkboxEvent(id: string) {
    let FilterContainer: HTMLElement | null = document.getElementById(id);

    if (FilterContainer) {
      FilterContainer.addEventListener('click', (e: Event) => {
        let targetElem = e.target as HTMLInputElement;

        if (id === "category-filter") {
          if (targetElem.value) this.updateURL('category', targetElem.value)
        } else if (id === "brand-filter") {
          if (targetElem.value) this.updateURL('brand', targetElem.value)
        }

        this.sortCards()
      })
    }
  }

  sortByCheckbox(): IProduct[] {
    this.queryFilterData('category')
    this.queryFilterData('brand')

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



  renderSlider(index: number) {
    this.queryFilterData(rangeContent[index].title, index)

    let rangeContainer = document.getElementById(rangeContent[index].id) as HTMLElement;
    if (rangeContainer) {
      rangeContainer.innerHTML = ''
      rangeContainer.innerHTML = `
      <h4 class="slider-block__title">${rangeContent[index].title}</h4>
      <div class="slider-block__numerical-difference">
        <p id="${rangeContent[index].type}-min">${rangeContent[index].minValue} ${rangeContent[index].symbol}</p>
        <p id="${rangeContent[index].type}-max">${rangeContent[index].maxValue} ${rangeContent[index].symbol}</p>
      </div>
      <div class="slider-block__slider">
        <div class="slider-block__range-input">
          <input type="range" class="slider-block__${rangeContent[index].type}-range-min" min="${rangeContent[index].min}" max="${rangeContent[index].max}" value="${rangeContent[index].minValue}" step="1">
          <input type="range" class="slider-block__${rangeContent[index].type}-range-max" min="${rangeContent[index].min}" max="${rangeContent[index].max}" value="${rangeContent[index].maxValue}" step="1">
        </div>
      </div>
      `
    }
    this.sliderEvent(index)
  }

  sliderEvent(index: number) {
    let minInput = document.querySelector(`.slider-block__${rangeContent[index].type}-range-min`) as HTMLInputElement;
    let minField = document.getElementById(`${rangeContent[index].type}-min`) as HTMLElement;

    let maxInput = document.querySelector(`.slider-block__${rangeContent[index].type}-range-max`) as HTMLInputElement;
    let maxField = document.getElementById(`${rangeContent[index].type}-max`) as HTMLElement;

    minInput.addEventListener('input', () => {
      minField.innerHTML = `${minInput.value}${rangeContent[index].symbol}`;
      this.sortCards()
      this.updateURL(rangeContent[index].title, minInput.value, maxInput.value)
    });

    maxInput.addEventListener('input', () => {
      maxField.innerHTML = `${maxInput.value}${rangeContent[index].symbol}`;
      this.sortCards()
      this.updateURL(rangeContent[index].title, minInput.value, maxInput.value)
    });
  }

  sortBySlider(arr: IProduct[] = this.pageCardsArr): IProduct[] {
    let priceMin = (document.querySelector('.slider-block__price-range-min') as HTMLInputElement).value;
    let priceMax = (document.querySelector('.slider-block__price-range-max') as HTMLInputElement).value;

    let stockMin = (document.querySelector('.slider-block__stock-range-min') as HTMLInputElement).value;
    let stockMax = (document.querySelector('.slider-block__stock-range-max') as HTMLInputElement).value;

    let resultCardsArr = arr.filter(item => {
      return ((item.price <= Number(priceMax) && item.price >= Number(priceMin))
        && (item.stock <= Number(stockMax) && item.stock >= Number(stockMin)));
    })

    return resultCardsArr
  }



  renderSearchValue() {
    let searchInput: HTMLInputElement | null = document.querySelector('.header-container__search-input')
    let searchValue: string | null | undefined = this.queryFilterData('search')
    if (searchInput) searchInput.value = ''
    if (searchInput && searchValue) searchInput.value = searchValue
  }

  searchEvent() {
    let searchInput: HTMLInputElement | null = document.querySelector('.header-container__search-input');

    const search = () => {
      let searchValue: string | undefined = searchInput?.value.toLowerCase();
      if (searchValue != undefined) this.updateURL('search', searchValue)
      this.sortCards()
    }

    if (searchInput) searchInput.oninput = () => search()

  }

  sortBySearch(arr: IProduct[] = this.pageCardsArr): IProduct[] {
    let searchValue = this.queryFilterData('search')

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



  renderCards(arr: IProduct[]) {
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
            <img class="card__img" src="${arr[i].thumbnail}">
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



  renderCardsSwitch() {
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

  sortBySwitch() {
    let cardsType = this.queryFilterData('big')

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
      this.updateURL('big', 'true')
    })

    threeElemBTN?.addEventListener('click', () => {
      ThreeElemSwitch()
      this.updateURL('big', 'false')
    })
  }



  renderSelector() {
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

  sortBySelector() {
    let select: HTMLSelectElement | null = document.querySelector('.select-filte__select');
    let selectValue: string | null | undefined = this.queryFilterData('sort');
    if (select && selectValue) select.value = selectValue;

    const pageCardsArr = this.pageCardsArr.slice()

    const sortByPrice = () => {
      pageCardsArr.sort((a, b) => a.price < b.price ? 1 : -1);
      this.renderCards(pageCardsArr)
    }

    const sortByRating = () => {
      pageCardsArr.sort((a, b) => a.rating < b.rating ? 1 : -1);
      this.renderCards(pageCardsArr)
    }

    const sortByOptions = () => {
      if (select?.value === 'price') {
        sortByPrice()
        this.updateURL('sort', 'price')
      } else if (select?.value === 'rating') {
        sortByRating()
        this.updateURL('sort', 'rating')
      }
      this.sortBySwitch()
      CardHandler.renderProducts__Cart()
    }

    const sortByOptions_RenderPage = () => {
      if (select?.value === 'price') {
        sortByPrice()
      } else if (select?.value === 'rating') {
        sortByRating()
      }
      this.sortBySwitch()
    }

    sortByOptions_RenderPage()

    let getValue: string;
    select?.addEventListener('change', function () {
      getValue = this.value;
      sortByOptions()
    });
  }




  updateURL(key: string, value: string, rangeValue?: string) {
    let urlParams = new URL(window.location.href)
    let params = new URLSearchParams(urlParams.search)
    if (key === 'category' || key === 'brand') {
      if (params.has(key)) {
        if (params.get(key) === value) params.delete(key)
        let valuesArr: string[] | undefined = params.get(key)?.split('↕')
        let firstLength = valuesArr?.length;
        valuesArr = valuesArr?.filter(item => item != value)

        if (firstLength === valuesArr?.length) valuesArr?.push(value)
        let result: string | undefined = valuesArr?.join('↕');

        if (result) params.set(key, result)
      } else {
        params.append(key, value)
      }
    } else if (key === 'search') {
      if (params.has(key)) {
        value === ''
          ? params.delete(key)
          : params.set(key, value)
      } else {
        params.append(key, value)
      }
    } else if (key === 'Price' || key === 'Stock') {
      let result = value + "⟷" + rangeValue;
      params.has(key)
        ? params.set(key, result)
        : params.append(key, result)
    } else if (key === 'remove') {
      let arr: string[] = []
      for (const key of params.keys()) {
        if (arr) arr.push(key)
      }
      arr.forEach(item => {
        params.delete(item)
      })

    } else {
      params.has(key)
        ? params.set(key, value)
        : params.append(key, value)
    }
    let path = window.location.pathname + '?' + params.toString();
    history.pushState(null, '', path);
  }

  queryFilterData(filter: string, sliderIndex?: number) {
    let urlParams = new URL(window.location.href)
    let params = new URLSearchParams(urlParams.search)
    let string = params.get(filter);
    if (filter === 'category') {
      if (string) {
        this.categoryCheckedArr = string.split('↕')
      } else {
        this.categoryCheckedArr = [];
      }
    } else if (filter === 'brand') {
      if (string) {
        this.brandCheckedArr = string.split('↕')
      } else {
        this.brandCheckedArr = [];
      }
    } else if (filter === 'Price' || filter === 'Stock') {
      if (string && sliderIndex != undefined) {
        let arr = string.split('⟷')
        rangeContent[sliderIndex].minValue = Number(arr[0])
        rangeContent[sliderIndex].maxValue = Number(arr[1])
      } else if (!string && sliderIndex != undefined) {
        rangeContent[sliderIndex].minValue = rangeContent[sliderIndex].min
        rangeContent[sliderIndex].maxValue = rangeContent[sliderIndex].max
      }
    } else if (filter === 'big' || filter === 'sort' || filter === 'search') {
      if (params.has(filter)) {
        return params.get(filter)
      } else {
        return null
      }
    }
  }



  resetFiltersBTN() {
    let BTN = document.getElementById('reset-BTN');
    const removeParams = () => {
      this.updateURL('remove', '')

      this.renderCheckbox('category-filter', 'category')
      this.renderCheckbox('brand-filter', 'brand')
      this.renderSlider(0)
      this.renderSlider(1)
      this.renderSearchValue()
      this.renderCardsSwitch()
      this.renderSelector()

      this.sortCards()
    }
    BTN?.addEventListener('click', removeParams)
  }

  copyFiltersBTN() {
    let BTN = document.getElementById('copy-BTN');

    BTN?.addEventListener('click', function (event) {
      let copyText: string = window.location.href;
      navigator.clipboard.writeText(copyText)

      if (BTN) {
        BTN.innerText = 'Copied!'
        BTN.style.backgroundColor = '#191919'
        BTN.style.color = '#F4F4F4'
      }
      setTimeout(function () {
        if (BTN) {
          BTN.innerText = 'Copy Link'
          BTN.removeAttribute("style")
        }
      }, 600);
    })
  }




  render() {
    this.renderCheckbox('category-filter', 'category')
    this.renderCheckbox('brand-filter', 'brand')
    this.renderSlider(0)
    this.renderSlider(1)
    this.renderSearchValue()
    this.renderCardsSwitch()
    this.renderSelector()

    this.checkboxEvent('category-filter')
    this.checkboxEvent('brand-filter')
    this.searchEvent()

    this.sortCards()

    this.resetFiltersBTN()
    this.copyFiltersBTN()
  }

}

export class CardHandler {

  constructor() { }


  static renderProducts__Cart() {
    let productCards = document.querySelectorAll('.product-card__card');
    let storageProducts__String: string | null = localStorage.getItem('productInCart')
    let storageProducts: IProduct[] = []
    if (storageProducts__String) storageProducts = JSON.parse(storageProducts__String);
    if (storageProducts.length > 0) {
      productCards.forEach(item => {
        let BTN: HTMLElement | null = item.querySelector('.card-btn');
        let ID = Number(BTN?.getAttribute('number'));
        for (let i = 0; i < storageProducts.length; i++) {
          if (storageProducts[i].id === ID) {
            if (BTN) {
              BTN.innerText = 'Drop from cart'
              BTN.style.backgroundColor = '#FF6E40'
              BTN.style.color = '#191919'
              BTN.style.border = 'none'
            }
            break
          }
        }
      })
    }
  }

  toggleProducts__Cart() {
    let cardsContainer: HTMLElement | null = document.getElementById('cards-container')

    const addProduct = (id: number, btn: HTMLButtonElement) => {
      btn.innerText = 'Drop from cart'
      btn.style.backgroundColor = '#FF6E40'
      btn.style.color = '#191919'
      btn.style.border = 'none'
      for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
          this.toggleProducts__localStorage(products[i])
          break
        }
      }
    }

    const removeProduct = (id: number, btn: HTMLButtonElement) => {
      btn.innerText = 'Add to cart'
      btn.removeAttribute("style")
      for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
          this.toggleProducts__localStorage(products[i])
          break
        }
      }
    }

    if (cardsContainer) {
      cardsContainer.addEventListener('click', (e: Event) => {
        let targetElem = e.target as HTMLButtonElement;
        if (targetElem.tagName === "BUTTON") {
          let cardID: number = Number(targetElem.getAttribute('number'));
          targetElem.innerText === 'Add to cart'
            ? addProduct(cardID, targetElem)
            : removeProduct(cardID, targetElem)
        }
      })
    }
  }

  toggleProducts__localStorage(obj: IProduct) {
    if (localStorage.getItem('productInCart') === null) {
      let arr: IProduct[] = [];
      arr.push(obj)
      localStorage.setItem('productInCart', JSON.stringify(arr));
    } else {
      let savedArr__String: string | null = localStorage.getItem('productInCart')
      if (savedArr__String) {
        let savedArr: IProduct[] = JSON.parse(savedArr__String);
        let firstLength = savedArr.length;
        let resultArr = savedArr.filter(item => item.id !== obj.id)
        if (firstLength === resultArr.length) resultArr.push(obj)
        localStorage.setItem('productInCart', JSON.stringify(resultArr));
      }
    }
  }




  render() {
    CardHandler.renderProducts__Cart()
    this.toggleProducts__Cart()
  }
}

export interface IRangeComponents {
  [key: string]: string | number;
  type: string;
  id: string;
  title: string
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  symbol: string;
}

export const rangeContent: IRangeComponents[] = [
  {
    type: 'price',
    id: 'price-slider',
    title: 'Price',
    min: 10.00,
    max: 1749.00,
    minValue: 10.00,
    maxValue: 1749.00,
    symbol: ' USD',
  },
  {
    type: 'stock',
    id: 'stock-slider',
    title: 'Stock',
    min: 1,
    max: 150,
    minValue: 1,
    maxValue: 150,
    symbol: '',
  }
]

export default MainPage;
