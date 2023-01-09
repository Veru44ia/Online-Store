export class URLData {

  private static getStart(symbol: string) {
    return window.location.hash.lastIndexOf(symbol);
  }

  static getID() {
    const start = this.getStart('/')
    const id = window.location.hash.slice(start + 1);
    return id;
  }

  static getHash() {
    const start = this.getStart('#')
    const end = window.location.hash.indexOf('page');
    const hash = window.location.hash.slice(start + 1, end + 4);
    return hash;
  }

}