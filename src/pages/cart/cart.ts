import Page from "../../core/templates/page";
import "./cart.css";

class Cart extends Page {
  content: string;

  constructor() {
    super();
    this.content = `
      <div class="cart-page-container">
        <div class="total-container">
          <div class="total-wrapper">
            <p class="total-products">Products: <b class="products-bold"></b></p>
            <p class="total-price">Total: <b class="price-bold"></b></p>
          </div>
          <div class="total-wrap">
            <input type="search" class="total-search" placeholder="Enter promo code">
            <span tooltip="Promo for test: RS, EPM" class="total-promo">My promo codes: 'RS', 'EPM'</span>
          </div>
          <button type="button" class="buy-btn">Buy now</button>
        </div>
      </div>
    `;
  }

  render() {
    return super.render();
  }
}

export default Cart;