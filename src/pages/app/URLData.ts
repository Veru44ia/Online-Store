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
    let hash = '';
    const start = this.getStart('#');
    const endForPageWhithID = this.getStart('/');
    hash = window.location.hash.slice(start + 1);
    if (start !== -1 && endForPageWhithID !== -1) hash = window.location.hash.slice(start + 1, endForPageWhithID);
    return hash;
  }

}