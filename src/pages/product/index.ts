import Page from "../../core/templates/page";

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
    `;
  }

  render() {
    return super.render();
  }
}

export default MainPage;
