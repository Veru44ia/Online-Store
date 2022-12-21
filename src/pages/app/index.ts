import Page from "../../core/templates/page";
import ProductPage from "../product";
import CartPage from "../cart/cart";
import Header from "../../core/components/header";

import { PageIDs } from "../../core/templates/page";
import { HeaderProperties } from "../../core/templates/components";

class App {
  private static container: HTMLElement = document.body;
  private static defaultPageID = "current-page";
  private header: Header;

  static renderNewPage(idPage: PageIDs | string) {
    const currentPAgeHTML = document.querySelector(`#${App.defaultPageID}`);
    if (currentPAgeHTML) {
      currentPAgeHTML.remove();
    }
    let page: Page | null = null;

    if (idPage === PageIDs.ProductPage) {
      page = new ProductPage();
      this.createDefaultPage(page);
    } else if (idPage === PageIDs.CartPage) {
      page = new CartPage();
      this.createDefaultPage(page);
    }
  }

  private static createDefaultPage(page: Page) {
    const pageHTML = page.render();
    pageHTML.id = App.defaultPageID;
    App.container.append(pageHTML);
  }

  private enableRoutPage() {
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
  }

  constructor() {
    this.header = new Header(HeaderProperties.tagName, HeaderProperties.className);
  }

  run() {
    App.container.appendChild(this.header.render());
    App.renderNewPage(PageIDs.ProductPage);
    this.enableRoutPage();
  }
}

export default App;
