import Page from '../../core/templates/page';

class ErrorPage extends Page {
  content: string;

  constructor() {
    super();
    this.content = `
    <div class="error-page">
    <h1>404<span class="error-page__sad-symbol">:(</pan></h1>
    </div>
    `
  }

  render() {
    return super.render()
  }
}

export default ErrorPage