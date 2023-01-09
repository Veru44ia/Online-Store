import Page from '../../core/templates/page';

class ErrorPage extends Page {
  content: string;

  constructor() {
    super();
    this.content = `
    <div class="error-page">
    <h1>404<span class="error-page__sad-symbol"> :(</span></h1>
    </div>
    `
  }

}

export default ErrorPage