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
  private initialPage: ProductPage;
  private header: Header;

  static rendeNewPage(idPage: string) {
    App.container.innerHTML = '';
    let page: Page | null = null;


    if (idPage === PageIDs.ProductPage) {
      page = new ProductPage(idPage);
    } else if (idPage === PageIDs.Cart) {
      page = new Cart(idPage);
    }

    if (page) {
      const pageHTML = page.render();
      App.container.append(pageHTML)
    }
  }

  private enableRoutPage() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.rendeNewPage(hash);
    })
  }

  constructor() {
    this.initialPage = new ProductPage('product-page')
    this.header = new Header('header', 'header-container')
  }

  run() {
    // App.rendeNewPage('product-page');
    App.container.append(this.header.render())
    this.enableRoutPage();
  }
}


export default App;