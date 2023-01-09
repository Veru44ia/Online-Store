export class CartPromoCode {

  static totalDiscount = 0;
  static promocodeInput: HTMLInputElement;

  changeTotalPrice(lastPrice: HTMLElement, realPrice: number) {
    lastPrice.style.textDecoration = 'line-through';
    document.getElementById('new-price')?.remove()
    lastPrice.insertAdjacentHTML('afterend', `
    <p id="new-price">Total: <b class="new-price-bold">${realPrice} USD</b></p>
    `)
  }

  calculateDiscount__AddDiscount(discount: number) {
    CartPromoCode.totalDiscount += discount;
    const price = document.querySelector(".price-bold") as HTMLElement;
    const priceNumber = Number(price.innerText.replace(/[^0-9]/g, ""));
    const newPrice = priceNumber - ((priceNumber * CartPromoCode.totalDiscount) / 100);
    this.changeTotalPrice(price, newPrice)
  }

  calculateDiscount__removeDiscount(discount: number) {
    CartPromoCode.totalDiscount -= discount;
    const price = document.querySelector(".price-bold") as HTMLElement;
    const priceNumber = Number(price.innerText.replace(/[^0-9]/g, ""));
    let newPrice;
    let newDiscount = 1;
    if (CartPromoCode.totalDiscount !== 0) {
      newDiscount = CartPromoCode.totalDiscount
      newPrice = priceNumber - ((priceNumber * newDiscount) / 100);
      this.changeTotalPrice(price, newPrice);
    } else {
      price.removeAttribute('style');
      document.getElementById('new-price')?.remove()
    }
  }

  setPromoCodeInputListener() {
    CartPromoCode.promocodeInput = document.querySelector('.total-search') as HTMLInputElement;
    const promoInput = CartPromoCode.promocodeInput
    promoInput.insertAdjacentHTML('beforebegin', `<div class="promo-container"></div>`)

    const promoContainer = document.querySelector('.promo-container') as HTMLInputElement;

    if (promoInput) promoInput.addEventListener('input', () => {
      this.findPromoCode(promoContainer, promoInput)
    })
  }

  findPromoCode(container: HTMLElement, input: HTMLInputElement) {
    const searchValue: string = input.value;
    if (searchValue === PromoParams.RS && !document.getElementById(PromoParams.RS)) {
      const button = this.renderPromoCode(container, PromoParams.RS, PromoParams.RS_TEXT)
      button.addEventListener('click', (event: Event) => this.togglePromoCode(event, PromoParams.RS))
    } else if (searchValue === PromoParams.EPM && !document.getElementById(PromoParams.EPM)) {
      const button = this.renderPromoCode(container, PromoParams.EPM, PromoParams.EPM_TEXT)
      button.addEventListener('click', (event: Event) => this.togglePromoCode(event, PromoParams.EPM))
    } else {
      this.clearPromoCode('promocode')
    }
  }

  togglePromoCode(event: Event, id: PromoParams) {
    const targetElem = event.target as HTMLElement;
    if (targetElem.tagName === "STRONG") {
      const promoButton = document.getElementById(`${id}-button`);
      const thisPromoContainer = document.getElementById(`${id}`);
      if (promoButton && promoButton?.innerText === 'Add') {
        CartPromoCode.promocodeInput.value = '';

        promoButton.innerText = 'Delete'
        thisPromoContainer?.classList.add('active-promo')
        if (id === PromoParams.RS) this.calculateDiscount__AddDiscount(10)
        else if (id === PromoParams.EPM) this.calculateDiscount__AddDiscount(10)
      } else if (promoButton && promoButton?.innerText === 'Delete') {
        promoButton.innerText = 'Add'
        thisPromoContainer?.remove()
        if (id === PromoParams.RS) this.calculateDiscount__removeDiscount(10)
        else if (id === PromoParams.EPM) this.calculateDiscount__removeDiscount(10)
      }
      targetElem.parentElement?.replaceWith(targetElem.parentElement?.cloneNode(true));
    }
  }

  renderPromoCode(container: HTMLElement, id: PromoParams, text: PromoParams): HTMLElement {
    container.insertAdjacentHTML('beforeend', `
    <div id="${id}" class="promocode">
    <h6>${text}</h6> <h6><strong id="${id}-button" class="promo-button">Add</strong></h6>
    </div>
    `)
    return container.lastElementChild as HTMLElement;
  }

  clearPromoCode(classTag: string) {
    const promoCollection = document.querySelectorAll(`.${classTag}`);
    promoCollection.forEach((item) => {
      if (!item.classList.contains('active-promo')) {
        item.remove()
      }
    })
  }

  start() {
    this.setPromoCodeInputListener()
    document.querySelector('.price-bold')?.addEventListener("DOMCharacterDataModified", () => console.log('pups3'))

    const price = document.querySelector('.price-bold');
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        console.log(mutation.type);
        console.log(price?.innerHTML);
      });
    });

    const config = { characterData: true, subtree: true };
    observer.observe(price as Node, config);
  }
}

const enum PromoParams {
  RS = "RS",
  EPM = "EPM",
  RS_TEXT = "Rolling Scopes School - 10%",
  EPM_TEXT = "EPAM Systems - 10%"
}

