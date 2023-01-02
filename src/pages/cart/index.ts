import Page from '../../core/templates/page';

class Cart extends Page {
  content: string;

  constructor() {
    super();
    this.content = `
    <h1>Cart Page</h1>
    `
  }

  render() {
    return super.render()
  }

}

export default Cart