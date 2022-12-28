import Page from "../../core/templates/page";
import "./cart.css";
import products from "../../data/products";
import { IProduct } from "../../types/types";
import Modal from "../../core/components/modal/modal";

// mock data (delete later)
localStorage.setItem("cart--products", JSON.stringify(products.slice(0, 6)));

class CartPage extends Page {
  private modal: Modal;

  constructor() {
    super();
    this.modal = new Modal("modal-container");
  }

  getFromLocalStorage() {
    if (localStorage.getItem("cart--products")) {
      this.renderCartPage(JSON.parse(localStorage.getItem("cart--products") || "[]"));
    } else {
      this.container.innerHTML = "";
      const paragraph = document.createElement("p");
      paragraph.textContent = "Cart is Empty!";
      paragraph.classList.add("empty-cart");
      this.container.append(paragraph);
    }
  }

  renderCartPage(products: IProduct[]) {
    const cartContainerWrapper = document.createElement("div");
    cartContainerWrapper.classList.add("cart-container-wrapper");
    (cartContainerWrapper as HTMLElement).innerHTML = "";

    const pagination = document.createElement("div");
    pagination.classList.add("pagination-container");

    pagination.innerHTML = `
      <span class="pagination-title">Items on page: </span>
      <input type="number" min="1" value="1" class="pagination-items-on-page">
      <span class="pagination-page">Page:</span>
      <input type="number" min="1" value="1" readonly class="pagination-number">
      <button type="button" class="pagination-prev"><</button>
      <button type="button" class="pagination-next">></button>
    `;

    const cartContainer = document.createElement("div");
    cartContainer.classList.add("cart-container");

    products.forEach(
      ({
        title,
        description,
        price,
        discountPercentage,
        rating,
        stock,
        brand,
        category,
        thumbnail,
      }) => {
        const cardsBlock = document.createElement("div");
        cardsBlock.classList.add("cart-product-item");

        cardsBlock.innerHTML = `
          <img src="${thumbnail}" alt="${title}" class="card-img">
          <div class="card-profile">
            <div class="card-top">
              <h2 class="card-title">${title}<span class="card-brand"> / ${brand}</span></h2>
              <p class="card-category">Category: ${category}</p>
              <span class="card-description">${description}</span>
            </div>
            <div class="card-bottom">
              <div class="card-wrap">
                <span class="card-rating">Rating: ${rating}</span>
                <span class="card-discount">Discount: ${discountPercentage}%</span>
              </div>
              <span class="card-stock">Stock: ${stock}</span>
              <div class="controls-wrapper">
                <button type="button" onclick="this.nextElementSibling.stepDown()" class="button-minus">-</button>
                <input type="number" min="1" value="1" readonly class="number">
                <button type="button" onclick="this.previousElementSibling.stepUp()" class="button-plus">+</button>
              </div>
              <span class="card-price">Price: ${price} USD</span>
            </div> 
          </div>
        `;

        (cartContainer as HTMLElement).append(cardsBlock);
      }
    );

    const total = document.createElement("div");
    total.classList.add("total-container");

    total.innerHTML = `
      <div class="total-wrapper">
        <p class="total-products">Products: <b>5</b></p>
        <p class="total-price">Total: <b>290 USD</b></p>
      </div>
      <div class="total-wrap">
        <input type="search" class="total-search" placeholder="Enter promo code">
        <span class="total-promo">My promo codes</span> 
      </div>
      <button type="button" class="buy-btn">Buy now</button>
    `;

    cartContainerWrapper.append(pagination);
    cartContainerWrapper.append(cartContainer);
    cartContainerWrapper.append(total);
    this.container.append(cartContainerWrapper);
  }

  render() {
    this.getFromLocalStorage();
    this.modal.openModal();
    return this.container;
  }
}

export default CartPage;
