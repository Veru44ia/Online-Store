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

  static rendeNewPage(idPage: string) {
    const currentPAgeHTML = document.querySelector(`#${App.defaultPageID}`);
    if (currentPAgeHTML) {
      currentPAgeHTML.remove()
    }
    let page: Page | null = null;


    if (idPage === PageIDs.ProductPage) {
      page = new ProductPage(idPage);
    } else if (idPage === PageIDs.Cart) {
      page = new Cart(idPage);
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageID
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
    App.container.appendChild(this.header.render())
    App.rendeNewPage('product-page');
    this.enableRoutPage();
  }
}


export default App;