import products from '../../core/data/products';
import Page from '../../core/templates/page';
import { IProduct } from '../../core/data/types';
import { PageIDs } from '../../core/templates/page';

export const Buttons = [
  {
    id: PageIDs.MainPage,
  },
  {
    id: PageIDs.Cart,
  },
  {
    id: PageIDs.Product,
  },
];

class ProductItem extends Page {
  id: string;
  static obj: IProduct;

  constructor(id: string) {
    super();
    this.id = id;
    ProductItem.obj = this.findeObject(this.id);

    this.content = `
    <div class="product-container__wrapper">
    <div class="product-container">
      <div class="product-container__product-path">
        <p class="product-path"><a href="#${Buttons[0].id}">Store</a></p>
        <h4>—</h4>
        <p class="product-path">${ProductItem.obj.category}</p>
        <h4>—</h4>
        <p class="product-path">${ProductItem.obj.brand}</p>
        <h4>—</h4>
        <p class="product-path"><strong>${ProductItem.obj.title}<strong></p>
      </div>
      <div class="product-container__product-info product-info">
        <div class="product-info__wrapper">
          <div class="product-info__img">
            <div class="product-info__items">
            </div>
            <div class="product-info__item-big">
              <img id="main-img" src="${ProductItem.obj.thumbnail}">
            </div>
          </div>
          <div class="product-info__product-text-info">
            <div class="product-text-info__main-info">
              <h3 class="product-text-info__title"><strong>${ProductItem.obj.title}</strong> / ${ProductItem.obj.brand} </h3>
              <p style="opacity: 0.5;" class="product-text-info__subtitle">${ProductItem.obj.category}</p>
            </div>
            <div class="product-text-info__description">
              <h6>${ProductItem.obj.description}</h6>
            </div>
            <div class="product-text-info__params">
              <p class="discount">Discount Percentage: <strong>${ProductItem.obj.discountPercentage}</strong></p>
              <p class="rating">Rating: <strong>${ProductItem.obj.rating}</strong></p>
              <p class="stock">Stock: <strong>${ProductItem.obj.stock}</strong></p>
            </div>
            <div class="product-text-info__btn-block">
              <div class="product-text-info__price">
              <h4><strong>${ProductItem.obj.price} USD</strong></h4>
              </div>
              <a>
                <button id="buy-BTN" class="buy-btn basic-btn btn-font">Buy now</button>
              </a>
              <button id="cart-BTN" class="second-btn btn-font">Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `
  }

  findeObject(idParam: string): IProduct {
    let obj: IProduct = products[0];
    products.forEach((item) => {
      if (item.id === Number(idParam)) obj = item;
    })
    return obj;
  }

  render() {
    window.location.search = '';
    return super.render()
  }
}
export default ProductItem