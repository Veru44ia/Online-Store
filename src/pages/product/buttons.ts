import { RenderCards } from './render-cards';
import { QueryParams } from './query-params';

export class MainPage__Buttons {

  static resetFiltersBTN() {
    let BTN = document.getElementById('reset-BTN');
    const removeParams = () => {
      QueryParams.updateURL('remove', '');
      RenderCards.renderPageElements()
    }
    BTN?.addEventListener('click', removeParams)
  }

  static copyFiltersBTN() {
    let BTN = document.getElementById('copy-BTN');

    BTN?.addEventListener('click', function (event) {
      let copyText: string = window.location.href;
      navigator.clipboard.writeText(copyText)

      if (BTN) {
        BTN.innerText = 'Copied!'
        BTN.style.backgroundColor = '#191919'
        BTN.style.color = '#F4F4F4'
      }
      setTimeout(function () {
        if (BTN) {
          BTN.innerText = 'Copy Link'
          BTN.removeAttribute("style")
        }
      }, 600);
    })
  }

  static render() {
    this.resetFiltersBTN()
    this.copyFiltersBTN()
  }
}