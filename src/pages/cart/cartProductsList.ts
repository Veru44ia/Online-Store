import "./cart.css";
import { IProd } from "../../core/data/types";
import Modal from "../../core/components/modal/modal";

class CartProductsList {
  modal: Modal;
  totalPrice: number;
  totalProducts: number;

  constructor() {
    this.totalPrice = 0;
    this.totalProducts = 0;
    this.modal = new Modal("modal-container");
  }

  getFromLocalStorage() {
    const myProducts: IProd[] = JSON.parse(localStorage.getItem("productInCart") || "[]");
    myProducts.map((item) => (item.count = 1));
    localStorage.setItem("productInCart", JSON.stringify(myProducts));
    if (
      localStorage.getItem("productInCart") &&
      JSON.parse(localStorage.getItem("productInCart") as string).length > 0
    ) {
      const products: IProd[] = JSON.parse(localStorage.getItem("productInCart") as string);
      products.map((item, index) => {
        return (item.orderNumber = index + 1);
      });
      this.renderProductsList(products);
    } else {
      const totalContainer = document.querySelector(".total-container") as HTMLDivElement;
      const cartContainerWrapper = document.querySelector(
        ".cart-container-wrapper"
      ) as HTMLDivElement;
      totalContainer.style.display = "none";
      cartContainerWrapper.textContent = "Cart is Empty!";
      cartContainerWrapper.classList.add("empty-cart");
    }
  }

  renderProductsList(products: IProd[]) {
    const cartContainerWrapper = document.querySelector(
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
          count,
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
                <input type="number" min="0" max="${stock}" value="${count}" readonly class="number">
                <button type="button" onclick="this.previousElementSibling.stepUp()" class="button button-plus">+</button>
              </div>
              <span class="card-price">Price: <span class="card-price-num">${price}</span> USD</span>
            </div>
          </div>
        `;
        (cartContainer as HTMLElement).append(cardsBlock);

        cardsBlock.addEventListener("click", (event: Event) => {
          if ((event.target as HTMLElement).closest(".controls-wrapper")) {
            const number = cardsBlock.querySelector(".number") as HTMLInputElement;
            const numberValue = (cardsBlock.querySelector(".number") as HTMLInputElement).value;
            number.setAttribute("value", `${numberValue}`);
            const products: IProd[] = JSON.parse(localStorage.getItem("productInCart") || "[]");
            products.map((item, index) => {
              if (index + 1 === orderNumber) item.count = +(number.getAttribute("value") as string);
            });
            localStorage.setItem("productInCart", JSON.stringify(products));
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
          }
        });
      }
    );
    cartContainerWrapper.append(cartContainer);
  }

  calculateTotalProducts() {
    const numbers = Array.from(document.querySelectorAll(".number")).map(
      (item) => +(item as HTMLInputElement).value
    );
    const totalProductsValue = document.querySelector(".products-bold") as HTMLElement;
    this.totalProducts = numbers.reduce((a, b) => a + b, 0);
    (totalProductsValue as HTMLElement).innerHTML = `${this.totalProducts}`;
    return this.totalProducts;
  }

  calculateTotalPrice() {
    const cardPriceNums = document.querySelectorAll(".card-price-num");
    const totalPriceValue = document.querySelector(".price-bold") as HTMLElement;
    const totalPriceArr = Array.from(cardPriceNums).map((item) => Number(item.innerHTML));
    this.totalPrice = totalPriceArr.reduce((a, b) => a + b, 0);
    (totalPriceValue as HTMLElement).innerHTML = `${this.totalPrice} USD`;
  }

  render() {
    this.getFromLocalStorage();
    this.calculateTotalProducts();
    this.calculateTotalPrice();
    this.modal.openModal();
  }
}

export default CartProductsList;
