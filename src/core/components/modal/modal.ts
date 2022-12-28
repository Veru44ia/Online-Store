import "./modal.css";

class Modal {
  container: HTMLElement;
  inputs: string[];
  imgSrc: string;

  constructor(className: string) {
    this.container = document.createElement("div");
    this.container.className = className;
    this.inputs = ["name", "email-input", "tel-input", "address-input", "card", "valid", "cvv"];
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

  checkValidate() {
    this.validateOnSubmit();
    this.validateOnEntry();
  }

  validateOnSubmit() {
    const form = this.container.querySelector(".form") as HTMLFormElement;
    form.addEventListener("submit", (event: Event) => {
      event.preventDefault();
      let res: boolean[] = [];
      this.inputs.forEach((item) => {
        const input = this.container.querySelector(`.${item}`) as HTMLInputElement;
        this.checkInputs(input);
        res.push(this.checkInputs(input));
      });
      res = res.filter((item) => !item);
      if (res.length === 0) {
        const modalWrapper = this.container.querySelector(".modal-wrapper") as HTMLDivElement;
        modalWrapper.innerHTML = "";
        const paragraph = document.createElement("p");
        paragraph.classList.add("order");
        paragraph.textContent = `Thank you for your order! Redirect to the store after 5 sec!`;
        modalWrapper.append(paragraph);
        localStorage.removeItem("cart--products");
      }
    });
  }

  validateOnEntry() {
    this.inputs.forEach((item) => {
      const input = this.container.querySelector(`.${item}`) as HTMLInputElement;
      input.addEventListener("input", () => {
        this.checkInputs(input);
      });
    });
  }

  checkInputs(input: HTMLInputElement) {
    const cardImg = this.container.querySelector(".card-image") as HTMLImageElement;
    let isValid = true;

    const error = (input: HTMLInputElement) => {
      (input.previousElementSibling as HTMLSpanElement).classList.add("span-error");
      (input.nextElementSibling as HTMLSpanElement).style.display = "inline-block";
      input.classList.add("border-error");
    };

    const success = (input: HTMLInputElement) => {
      (input.previousElementSibling as HTMLSpanElement).classList.remove("span-error");
      (input.nextElementSibling as HTMLSpanElement).style.display = "none";
      input.classList.remove("border-error");
    };

    const checkEmail = (email: HTMLInputElement) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (pattern.test(email.value)) {
        success(email);
        isValid = true;
      } else {
        error(email);
        isValid = false;
      }
    };

    const checkName = (name: HTMLInputElement) => {
      const pattern = /([A-Z]{1}[a-z-]{2,}\s[A-Z]{1}[a-z-]{2,})+$/;

      if (pattern.test(name.value)) {
        success(name);
        isValid = true;
      } else {
        error(name);
        isValid = false;
      }
    };

    const checkAddress = (address: HTMLInputElement) => {
      const pattern = /(.{5,}\s.{5,}\s.{5,})+$/;

      if (pattern.test(address.value)) {
        success(address);
        isValid = true;
      } else {
        error(address);
        isValid = false;
      }
    };

    const checkTel = (tel: HTMLInputElement) => {
      const pattern = /^\+[0-9]{9,}$/;

      if (pattern.test(tel.value)) {
        success(tel);
        isValid = true;
      } else {
        error(tel);
        isValid = false;
      }
    };

    const checkcardNumber = (cardNumber: HTMLInputElement) => {
      const pattern = /^[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{4}$/;
      if (cardNumber.value[0] === "4") {
        this.imgSrc = "./assets/Visa.svg";
        cardImg.setAttribute("src", this.imgSrc);
      } else if (cardNumber.value[0] === "5") {
        this.imgSrc = "./assets/Mastercard.svg";
        cardImg.setAttribute("src", this.imgSrc);
      } else if (cardNumber.value[0] === "6") {
        this.imgSrc = "./assets/Maestro.svg";
        cardImg.setAttribute("src", this.imgSrc);
      } else {
        this.imgSrc = "./assets/credit_card_icon.svg";
        cardImg.setAttribute("src", this.imgSrc);
      }

      if (pattern.test(cardNumber.value) && cardNumber.value.length === cardNumber.maxLength) {
        success(cardNumber);
        isValid = true;
      } else if (cardNumber.value.length > cardNumber.maxLength) {
        cardNumber.value = cardNumber.value.slice(0, cardNumber.maxLength);
      } else {
        error(cardNumber);
        isValid = false;
      }
    };

    const checkCvv = (cvv: HTMLInputElement) => {
      const pattern = /^[0-9]{1,3}$/;

      if (pattern.test(cvv.value) && cvv.value.length === cvv.maxLength) {
        success(cvv);
        isValid = true;
      } else if (cvv.value.length > cvv.maxLength) {
        cvv.value = cvv.value.slice(0, cvv.maxLength);
      } else {
        error(cvv);
        isValid = false;
      }
    };

    const checkValid = (valid: HTMLInputElement) => {
      const pattern = /^(0?[1-9]|1[0-2])[0-9]{2}$/;

      if (pattern.test(valid.value) && valid.value.length === valid.maxLength) {
        success(valid);
        isValid = true;
      } else if (valid.value.length > valid.maxLength) {
        valid.value = valid.value.slice(0, valid.maxLength);
      } else {
        error(valid);
        isValid = false;
      }
    };

    if (input.getAttribute("name") === "e-mail") {
      checkEmail(input);
    } else if (input.getAttribute("name") === "name") {
      checkName(input);
    } else if (input.getAttribute("name") === "address") {
      checkAddress(input);
    } else if (input.getAttribute("name") === "phone") {
      checkTel(input);
    } else if (input.getAttribute("name") === "card-number") {
      checkcardNumber(input);
    } else if (input.getAttribute("name") === "СVV") {
      checkCvv(input);
    } else if (input.getAttribute("name") === "valid") {
      checkValid(input);
    }

    return isValid;
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

    this.closeModal();
    this.checkValidate();
    return this.container;
  }
}

export default Modal;
