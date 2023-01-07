import Page from "../../core/templates/page";
import { CardHandler } from "../product/code/CardHandler";
import { RenderCards } from "../product/code/RenderCards";
import Cart from "../cart/cart";
import CartProductsList from "../cart/cartProductsList";
import MainPage from "../product";
import Header from "../../core/components/header";

import { PageIDs } from "../../core/templates/page";
import { HeaderProperties } from "../../core/templates/components";

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
      let cards = new RenderCards();
      cards.render();
      let cardHandler = new CardHandler();
      cardHandler.render();
    } else if (value === PageIDs.Cart) {
      page = new Cart();
      this.createDefaultPage(page);
      const cartProductsList = new CartProductsList();
      cartProductsList.render();
    } else if (value === PageIDs.Product) {
    }
  }

  private static createDefaultPage(page: Page) {
    const pageHTML = page.render();
    pageHTML.id = App.defaultPageID;
    App.container.append(pageHTML);
  }

  private enableRoutPage() {
    window.addEventListener("hashchange", () => {
      const hash = this.getHash();
      for (let item in PageIDs) {
        let key = item as keyof typeof PageIDs;
        if (PageIDs[key] === hash) {
          App.renderNewPage(PageIDs[key]);
        }
      }
    });
  }

  private getHash() {
    let start = window.location.hash.indexOf("#");
    let end = window.location.hash.indexOf("page");
    const hash = window.location.hash.slice(start + 1, end + 4);
    return hash;
  }

  constructor() {
    this.header = new Header(HeaderProperties.tagName, HeaderProperties.className);
  }

  run() {
    App.container.appendChild(this.header.render());
    const hash = this.getHash();
    if (hash === PageIDs.Product) {
      App.renderNewPage(PageIDs.Product);
    } else if (hash === PageIDs.Cart) {
      App.renderNewPage(PageIDs.Cart);
    } else App.renderNewPage(PageIDs.MainPage);
    this.enableRoutPage();
  }
}

export default App;
