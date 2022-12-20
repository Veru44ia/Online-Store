export const enum PageIDs {
  ProductPage = 'product-page',
  Cart = 'cart-page',
}

abstract class Page {
  protected container: HTMLElement;
  static TextObject = {};

  constructor() {
    this.container = document.createElement('main');
  }

  protected createHeaderTitle(text: string) {
    const headerTitle = document.createElement('h1');
    headerTitle.innerText = text;
    return headerTitle;
  }

  render() {
    return this.container;
  }
}

export default Page;