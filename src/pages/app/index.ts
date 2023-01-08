import Page from '../../core/templates/page';
import { CardHandler } from '../product/code/CardHandler';
import { RenderCards } from '../product/code/RenderCards';
import Cart from '../cart';
import MainPage from '../product';
import Header from '../../core/components/header';

import ProductItem from '../product-item';
import { ProductPageHandler } from '../product-item/code/ProductPageHandler';

import { PageIDs } from '../../core/templates/page';
import { HeaderProperties } from '../../core/templates/components';
import { URLData } from './URLData';

class App {
  private static container: HTMLElement = document.body;
  private static defaultPageID = 'current-page';
  private header: Header;

  static renderNewPage(value: PageIDs) {
    const currentPAgeHTML = document.querySelector(`#${App.defaultPageID}`);
    if (currentPAgeHTML) {
      currentPAgeHTML.remove()
    }
    let page: Page | null = null;

    if (value === PageIDs.MainPage) {
      page = new MainPage();
      this.createDefaultPage(page)
      const cards = new RenderCards()
      cards.render()
      const cardHandler = new CardHandler()
      cardHandler.render()
    } else if (value === PageIDs.Cart) {
      page = new Cart();
      this.createDefaultPage(page)
    } else if (value === PageIDs.Product) {
      const id = URLData.getID();
      page = new ProductItem(id);
      this.createDefaultPage(page);
      const pageManagement = new ProductPageHandler();
      pageManagement.render();
    }
  }

  private static createDefaultPage(page: Page) {
    const pageHTML = page.render();
    pageHTML.id = App.defaultPageID
    App.container.append(pageHTML)
  }

  private enableRoutPage() {
    window.addEventListener('hashchange', () => {
      const hash = URLData.getHash();
      for (const item in PageIDs) {
        const key = item as keyof typeof PageIDs;
        if (PageIDs[key] === hash) {
          App.renderNewPage(PageIDs[key]);
        }
      }
    })
  }

  constructor() {
    this.header = new Header(HeaderProperties.tagName, HeaderProperties.className)
  }

  run() {
    App.container.appendChild(this.header.render())
    const hash = URLData.getHash();
    if (hash === PageIDs.Product) {
      App.renderNewPage(PageIDs.Product);
    } else if (hash === PageIDs.Cart) {
      App.renderNewPage(PageIDs.Cart);
    } else App.renderNewPage(PageIDs.MainPage);
    this.enableRoutPage();
  }
}


export default App;