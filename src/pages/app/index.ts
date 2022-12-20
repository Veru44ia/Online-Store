import Page from '../../core/templates/page';
import ProductPage from '../product';
import Cart from '../cart';
import Header from '../../core/components/header';

export const enum PageIDs {
  ProductPage = 'product-page',
  Cart = 'cart-page',
}

class App {
  private static container: HTMLElement = document.body;
  private static defaultPageID = 'current-page'
  private initialPage: ProductPage;
  private header: Header;

  static renderNewPage(idPage: string) {
    const currentPAgeHTML = document.querySelector(`#${App.defaultPageID}`);
    if (currentPAgeHTML) {
      currentPAgeHTML.remove()
    }
    let page: Page | null = null;

    if (idPage === PageIDs.ProductPage) {
      page = new ProductPage(idPage);
      this.createDefaultPage(page)
    } else if (idPage === PageIDs.Cart) {
      page = new Cart(idPage);
      this.createDefaultPage(page)
    }
  }

  private static createDefaultPage(page: Page) {
    const pageHTML = page.render();
    pageHTML.id = App.defaultPageID
    App.container.append(pageHTML)
  }

  private enableRoutPage() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    })
  }

  constructor() {
    this.initialPage = new ProductPage('product-page')
    this.header = new Header('header', 'header-container')
  }

  run() {
    App.container.appendChild(this.header.render())
    App.renderNewPage('product-page');
    this.enableRoutPage();
  }
}


export default App;