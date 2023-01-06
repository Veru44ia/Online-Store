export enum PageIDs {
  MainPage = 'main-page',
  Cart = 'cart-page',
  Product = 'product-page'
}

abstract class Page {
  protected container: HTMLElement;
  protected position: InsertPosition;
  protected content: string;

  constructor() {
    this.container = document.createElement('main');
    this.position = 'afterbegin'
    this.content = ``
  }

  render() {
    this.container.insertAdjacentHTML(this.position, this.content)
    return this.container;
  }
}

export default Page;