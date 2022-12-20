abstract class Component {
  protected container: HTMLElement;
  protected position: InsertPosition;
  protected content: string;

  constructor(tagName: string, className: string) {
    this.container = document.createElement(tagName);
    this.container.className = className;
    this.position = 'afterbegin'
    this.content = ``
  }

  render() {
    this.container.insertAdjacentHTML(this.position, this.content)
    return this.container;
  }
}

export default Component;