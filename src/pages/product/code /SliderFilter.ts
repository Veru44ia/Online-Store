import products from '../../../core/data';
import { RenderCards } from './RenderCards';
import { IProduct, rangeContent } from '../../../core/data';
import { QueryParamsHandler } from './QueryParamsHandler';

export class SliderFilter {

  static renderSlider(index: number) {
    QueryParamsHandler.queryFilterData(rangeContent[index].title, index)

    let rangeContainer = document.getElementById(rangeContent[index].id) as HTMLElement;
    if (rangeContainer) {
      rangeContainer.innerHTML = ''
      rangeContainer.innerHTML = `
      <h4 class="slider-block__title">${rangeContent[index].title}</h4>
      <div class="slider-block__numerical-difference">
        <p id="${rangeContent[index].type}-min">${rangeContent[index].minValue} ${rangeContent[index].symbol}</p>
        <p id="${rangeContent[index].type}-max">${rangeContent[index].maxValue} ${rangeContent[index].symbol}</p>
      </div>
      <div class="slider-block__slider">
        <div class="slider-block__range-input">
          <input type="range" class="slider-block__${rangeContent[index].type}-range-min" min="${rangeContent[index].min}" max="${rangeContent[index].max}" value="${rangeContent[index].minValue}" step="1">
          <input type="range" class="slider-block__${rangeContent[index].type}-range-max" min="${rangeContent[index].min}" max="${rangeContent[index].max}" value="${rangeContent[index].maxValue}" step="1">
        </div>
      </div>
      `
    }

    SliderFilter.sliderEvent(index)
  }

  static sliderEvent(index: number) {
    let minInput = document.querySelector(`.slider-block__${rangeContent[index].type}-range-min`) as HTMLInputElement;
    let minField = document.getElementById(`${rangeContent[index].type}-min`) as HTMLElement;

    let maxInput = document.querySelector(`.slider-block__${rangeContent[index].type}-range-max`) as HTMLInputElement;
    let maxField = document.getElementById(`${rangeContent[index].type}-max`) as HTMLElement;

    minInput.addEventListener('input', () => {
      minField.innerHTML = `${minInput.value}${rangeContent[index].symbol}`;
      RenderCards.sortCards()
      QueryParamsHandler.updateURL(rangeContent[index].title, minInput.value, maxInput.value)
    });

    maxInput.addEventListener('input', () => {
      maxField.innerHTML = `${maxInput.value}${rangeContent[index].symbol}`;
      RenderCards.sortCards()
      QueryParamsHandler.updateURL(rangeContent[index].title, minInput.value, maxInput.value)
    });
  }

  static sortBySlider(arr: IProduct[] = products.slice()): IProduct[] {
    let priceMin = (document.querySelector('.slider-block__price-range-min') as HTMLInputElement).value;
    let priceMax = (document.querySelector('.slider-block__price-range-max') as HTMLInputElement).value;

    let stockMin = (document.querySelector('.slider-block__stock-range-min') as HTMLInputElement).value;
    let stockMax = (document.querySelector('.slider-block__stock-range-max') as HTMLInputElement).value;
    let resultCardsArr = arr.filter(item => {
      return ((item.price <= Number(priceMax) && item.price >= Number(priceMin))
        && (item.stock <= Number(stockMax) && item.stock >= Number(stockMin)));
    })

    return resultCardsArr

  }

  static render() {
    SliderFilter.renderSlider(0)
    SliderFilter.renderSlider(1)
    SliderFilter.sliderEvent(0)
    SliderFilter.sliderEvent(1)
    SliderFilter.sortBySlider()
  }

}