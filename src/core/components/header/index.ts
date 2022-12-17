import Component from "../../templates/components";
import { PageIDs } from '../../../pages/app';

const Buttons = [
  {
    id: PageIDs.ProductPage,
    text: 'ProductPage',
  },
  {
    id: PageIDs.Cart,
    text: 'Cart',
  },
];

class Header extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className)
  }

  renderHeaderContainer() {
    this.container.insertAdjacentHTML('afterbegin', `
    <div class="header-wrapper">
    <div class="header-container__logo">
      <h1>MAGAZIN</h1>
    </div>
    <div class="header-container__cart-total">
      <p class="p-bold">Cart total:</p>
      <p id="cart-total">10,945.00 USD</p>
    </div>
    <div class="header-container__search_cart">
      <div class="header-container__search">
        <input class="header-container__search-input input">
        <button class="header-container__search-btn btn">
          <img src="./assets/icons/search.svg" alt="search" width="15.12px" height="15.88px">
        </button>
      </div>
      <div class="header-container__cart">
        <a href="#">
          <img src="./assets/icons/shopping-bags 1.svg" width="32px" height="32px">
        </a>
      </div>
    </div>
  </div>
    `)
  }

  render() {
    this.renderHeaderContainer();
    return this.container
  }
}

export default Header