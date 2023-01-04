import Page from "../../core/templates/page";
import "./cart.css";
import products from "../../data/products";
import { IProduct } from "../../types/types";
import Modal from "../../core/components/modal/modal";

// mock data (delete later)
localStorage.setItem("productInCart", JSON.stringify(products.slice(0, 6)));

class CartPage extends Page {
  private modal: Modal;
  totalPrice: number;
  totalProducts: number;

  constructor() {
    super();
    this.totalPrice = 0;
    this.totalProducts = 0;
    this.modal = new Modal("modal-container");
  }

  getFromLocalStorage() {
    if (localStorage.getItem("productInCart")) {
      const products: IProduct[] = JSON.parse(localStorage.getItem("productInCart") || "[]");
      products.map(function (item, index) {
        item.orderNumber = index + 1;
      });
      this.renderProductsList(products);
    } else {
      this.container.innerHTML = "";
      const paragraph = document.createElement("p");
      paragraph.textContent = "Cart is Empty!";
      paragraph.classList.add("empty-cart");
      this.container.append(paragraph);
    }
  }

  renderPagination() {
    const pagination = document.createElement("div");
    pagination.classList.add("pagination-container");

    pagination.innerHTML = `
      <span class="pagination-title">Items on page: </span>
      <input type="number" min="1" value="3" class="pagination-items-on-page">
      <span class="pagination-page">Page:</span>
      <input type="number" min="1" value="1" readonly class="pagination-number">
      <button type="button" class="pagination-prev"><</button>
      <button type="button" class="pagination-next">></button>
    `;

    this.container.prepend(pagination);
  }

  renderCartContainer() {
    const cartContainerWrapper = document.createElement("div");
    cartContainerWrapper.classList.add("cart-container-wrapper");
    this.container.append(cartContainerWrapper);
  }

  renderProductsList(products: IProduct[]) {
    const cartContainerWrapper = this.container.querySelector(
      ".cart-container-wrapper"
    ) as HTMLDivElement;
    (cartContainerWrapper as HTMLElement).innerHTML = "";

    const cartContainer = document.createElement("div");
    cartContainer.classList.add("cart-container");

    products.forEach(
      (
        {
          title,
          description,
          price,
          discountPercentage,
          rating,
          stock,
          brand,
          category,
          thumbnail,
          orderNumber,
        },
        index
      ) => {
        const cardsBlock = document.createElement("div");
        cardsBlock.classList.add("cart-product-item");
        this.totalProducts = products.length;
        this.totalPrice += price;
        cardsBlock.innerHTML = `
          <div class="order-number">${orderNumber}</div>
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
                <button type="button" onclick="this.nextElementSibling.stepDown()" class="button button-minus">-</button>
                <input type="number" min="0" max="${stock}" value="1" readonly class="number">
                <button type="button" onclick="this.previousElementSibling.stepUp()" class="button button-plus">+</button>
              </div>
              <span class="card-price">Price: <span class="card-price-num">${price}</span> USD</span>
            </div> 
          </div>
        `;

        (cartContainer as HTMLElement).append(cardsBlock);

        cardsBlock.addEventListener("click", () => {
          const number = cardsBlock.querySelector(".number") as HTMLInputElement;
          const numberValue = (cardsBlock.querySelector(".number") as HTMLInputElement).value;
          number.setAttribute("value", `${numberValue}`);
          const cardPriceNum = cardsBlock.querySelector(".card-price-num") as HTMLSpanElement;
          if (+numberValue < 1) {
            const productInCart = JSON.parse(localStorage.getItem("productInCart") || "[]");
            productInCart.splice(index, 1);
            localStorage.setItem("productInCart", JSON.stringify(productInCart));
            this.getFromLocalStorage();
          }
          cardPriceNum.innerHTML = (+numberValue * products[index].price).toString();
          this.calculateTotalProducts();
          this.calculateTotalPrice();
        });
      }
    );

    cartContainerWrapper.append(cartContainer);
  }

  calculateTotalProducts() {
    const numbers = Array.from(this.container.querySelectorAll(".number")).map((item) => {
      return +(item as HTMLInputElement).value;
    });
    const totalProductsValue = this.container.querySelector(".products-bold") as HTMLElement;
    this.totalProducts = numbers.reduce((a, b) => a + b, 0);
    totalProductsValue.innerHTML = `${this.totalProducts}`;
    return this.totalProducts;
  }

  calculateTotalPrice() {
    const cardPriceNums = this.container.querySelectorAll(".card-price-num");
    const totalPriceValue = this.container.querySelector(".price-bold") as HTMLElement;
    const totalPriceArr = Array.from(cardPriceNums).map((item) => {
      return Number(item.innerHTML);
    });

    this.totalPrice = totalPriceArr.reduce((a, b) => a + b, 0);
    totalPriceValue.innerHTML = `${this.totalPrice} USD`;
  }

  renderTotal() {
    const total = document.createElement("div");
    total.classList.add("total-container");

    total.innerHTML = `
      <div class="total-wrapper">
        <p class="total-products">Products: <b class="products-bold">${this.totalProducts}</b></p>
        <p class="total-price">Total: <b class="price-bold">${this.totalPrice} USD</b></p>
      </div>
      <div class="total-wrap">
        <input type="search" class="total-search" placeholder="Enter promo code">
        <span class="total-promo">My promo codes</span> 
      </div>
      <button type="button" class="buy-btn">Buy now</button>
    `;

    this.container.append(total);
  }

  render() {
    this.renderPagination();
    this.renderCartContainer();
    this.getFromLocalStorage();
    this.renderTotal();
    this.modal.openModal();
    return this.container;
  }
}

export default CartPage;
