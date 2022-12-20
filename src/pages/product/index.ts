import Page from '../../core/templates/page';
import { PageIDs } from '../../core/templates/page';

class ProductPage extends Page {
  static TextObject = {
    MainTitle: 'ProductPage',
  };

  constructor() {
    super();
    this.container.id = PageIDs.ProductPage
  }

  render() {
    const title = this.createHeaderTitle(ProductPage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}

export default ProductPage;