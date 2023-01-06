import Page from '../../core/templates/page';
import { CardHandler } from '../product/code /CardHandler';
import { RenderCards } from '../product/code /RenderCards';
import Cart from '../cart';
import MainPage from '../product';
import Header from '../../core/components/header';

import { PageIDs } from '../../core/templates/page';
import { HeaderProperties } from '../../core/templates/components';

class App {
  private static container: HTMLElement = document.body;
  private static defaultPageID = 'current-page';
  private header: Header;

  static renderNewPage(idPage: PageIDs | string) {
    const currentPAgeHTML = document.querySelector(`#${App.defaultPageID}`);
    if (currentPAgeHTML) {
      currentPAgeHTML.remove()
    }
    let page: Page | null = null;

    if (idPage === PageIDs.MainPage) {
      page = new MainPage();
      this.createDefaultPage(page)
      let cards = new RenderCards()
      cards.render()
      let cardHandler = new CardHandler()
      cardHandler.render()
    } else if (idPage === PageIDs.Cart) {
      page = new Cart();
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
    this.header = new Header(HeaderProperties.tagName, HeaderProperties.className)
  }

  run() {
    App.container.appendChild(this.header.render())
    App.renderNewPage(PageIDs.MainPage);
    this.enableRoutPage();
  }
}


export default App;