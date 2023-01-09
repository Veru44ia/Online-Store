import Page from "../../core/templates/page";
import { CardHandler } from "../product/code/CardHandler";
import { RenderCards } from "../product/code/RenderCards";
import Cart from "../cart/cart";
import CartProductsList from "../cart/cartProductsList";
import MainPage from "../product";
import Header from "../../core/components/header";
import ProductItem from '../product-item';
import { ProductPageHandler } from '../product-item/code/ProductPageHandler';
import { PageIDs } from '../../core/templates/page';
import { HeaderProperties } from '../../core/templates/components';
import { URLData } from './URLData';
import ErrorPage from '../404';


class App {
  private static container: HTMLElement = document.body;
  private static defaultPageID = "current-page";
  private header: Header;

  static renderNewPage(value: PageIDs) {
    const currentPAgeHTML = document.querySelector(`#${App.defaultPageID}`);
    if (currentPAgeHTML) {
      currentPAgeHTML.remove();
    }
    let page: Page | null = null;

    if (value === PageIDs.MainPage) {
      page = new MainPage();
      this.createDefaultPage(page);
      const cards = new RenderCards();
      cards.render();
      const cardHandler = new CardHandler();
      cardHandler.render();
    } else if (value === PageIDs.Cart) {
      page = new Cart();
      this.createDefaultPage(page);
      const cartProductsList = new CartProductsList("cart-container");
      cartProductsList.render();
    } else if (value === PageIDs.Product) {
      const id = URLData.getID();
      page = new ProductItem(id);
      this.createDefaultPage(page);
      const pageManagement = new ProductPageHandler();
      pageManagement.render();
    } else {
      page = new ErrorPage()
      this.createDefaultPage(page)
    }
  }

  private static createDefaultPage(page: Page) {
    const pageHTML = page.render();
    pageHTML.id = App.defaultPageID;
    App.container.append(pageHTML);
  }

  private enableRoutPage() {
    window.addEventListener('hashchange', () => {
      let pageExists = false;
      const hash = URLData.getHash();

      for (const item in PageIDs) {
        const key = item as keyof typeof PageIDs;
        if (PageIDs[key] === hash) {
          App.renderNewPage(PageIDs[key]);
          pageExists = true;
        }
      }
      if (!pageExists) App.renderNewPage(PageIDs.Error);
    })
  }

  constructor() {
    this.header = new Header(HeaderProperties.tagName, HeaderProperties.className);
  }

  run() {
    App.container.appendChild(this.header.render())
    const hash = URLData.getHash();

    if (hash === PageIDs.Product) {
      App.renderNewPage(PageIDs.Product);
    } else if (hash === PageIDs.Cart) {
      App.renderNewPage(PageIDs.Cart);
    } else if (hash === PageIDs.MainPage || hash === '') {
      App.renderNewPage(PageIDs.MainPage);
    }
    else App.renderNewPage(PageIDs.Error);
    this.enableRoutPage();
  }
}

export default App;
