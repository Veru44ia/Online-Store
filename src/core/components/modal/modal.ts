import "./modal.css";

class Modal {
  container: HTMLElement;
  imgSrc: string;

  constructor(className: string) {
    this.container = document.createElement("div");
    this.container.className = className;
    this.imgSrc = "./assets/credit_card_icon.svg";
  }

  openModal() {
    document.addEventListener("click", (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest(".buy-btn")) {
        document.body.prepend(this.render());
      }
    });
  }

  closeModal() {
    const closeIcon = this.container.querySelector(".close-modal");
    this.container.addEventListener("click", (event: MouseEvent) => {
      if (
        (event.target as HTMLElement) === this.container ||
        (event.target as HTMLElement) === closeIcon
      ) {
        this.container.remove();
      }
    });
  }

  render() {
    this.container.innerHTML = `
      <div class="modal-wrapper">
        <button type="button" class="close-modal">x</button>
        <form class="form">
          <div class="modal-wrapper-left">
            <p class="modal-title">Personal details</p>
            <label class="input-label">
              <span>Name</span>
              <input type="text" class="text-input name" name="name" />
              <span class="name-error">error</span>
            </label>
            <label class="input-label">
              <span>E-mail</span>
              <input type="email" class="email-input" name="e-mail" />
              <span class="e-mail-error">error</span>
            </label>
            <label class="input-label">
              <span>Phone number</span>
              <input type="tel" class="tel-input" name="phone" minlength="10" 
                onkeypress="return event.charCode === 43 || (event.charCode >= 48 && event.charCode <= 57)"
              />
              <span class="phone-error">error</span>
            </label>
            <label class="input-label">
              <span>Delivery address</span>
              <input type="text" class="address-input" name="address" />
              <span class="error">error</span>
            </label>
          </div> 
          <div class="modal-wrapper-right">
            <p class="modal-title">Credit card details</p>
            <div class="modal-credit-card">
              <img class="card-image" src="${this.imgSrc}" alt="card-image" />
              <div class="modal-inner">
                <label class="input-label">
                  <span>Card number</span>
                  <input type="number" class="text-input card" name="card-number" maxLength="16" 
                    onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                  />
                  <span class="error">error</span>
                </label>
                <div class="credit-card-wrap">
                  <label class="input-label">
                    <span>Valid</span>
                    <input type="number" class="text-input valid" name="valid" maxLength="4" 
                      onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                    />
                    <span class="error">error</span>
                  </label>
                  <label class="input-label">
                    <span>СVV</span>
                    <input type="number" class="text-input cvv" name="СVV" maxLength="3"
                      onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                    />
                    <span class="error">error</span>
                  </label>
                </div>
              </div>
            </div>
            <button class="submit-btn" type="submit">Confirm</button>
          </div> 
        </form> 
      </div>  
    `;

    return this.container;
  }
}

export default Modal;
