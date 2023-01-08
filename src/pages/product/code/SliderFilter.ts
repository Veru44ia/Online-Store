import products from '../../../core/data/products';
import { RenderCards } from './RenderCards';
import { IProduct, rangeContent } from '../../../core/data/types';
import { QueryParamsHandler } from './QueryParamsHandler';

export class SliderFilter {
  static areEventListenersSet = false;

  static renderSlider(index: number) {
    QueryParamsHandler.queryFilterData(rangeContent[index].title, index)
    const rangeContainer = document.getElementById(rangeContent[index].id) as HTMLElement;

    const {
      title,
      type,
      symbol,
      min,
      max,
      minValue,
      maxValue,
    } = rangeContent[index];

    rangeContainer.innerHTML = ''
    rangeContainer.innerHTML = `
      <h4 class="slider-block__title">${title}</h4>
      <div class="slider-block__numerical-difference">
        <p id="${type}-min">${minValue} ${symbol}</p>
        <p id="${type}-max">${maxValue} ${symbol}</p>
      </div>
      <div class="slider-block__slider">
        <div class="slider-block__range-input">
          <input type="range" class="slider-block__${type}-range-min" min="${min}" max="${max}" value="${minValue}" step="1">
          <input type="range" class="slider-block__${type}-range-max" min="${min}" max="${max}" value="${maxValue}" step="1">
        </div>
      </div>
      `

    SliderFilter.sliderEvent(index)
  }

  static sliderEvent(index: number) {
    const {
      type,
      symbol,
      title,
    } = rangeContent[index];

    const minInput = document.querySelector(`.slider-block__${type}-range-min`) as HTMLInputElement;
    const minField = document.getElementById(`${type}-min`) as HTMLElement;

    const maxInput = document.querySelector(`.slider-block__${type}-range-max`) as HTMLInputElement;
    const maxField = document.getElementById(`${type}-max`) as HTMLElement;

    minInput.addEventListener('input', () => {
      minField.innerHTML = `${minInput.value}${symbol}`;
      RenderCards.sortCards()
      QueryParamsHandler.updateURL(title, minInput.value, maxInput.value)
    });

    maxInput.addEventListener('input', () => {
      maxField.innerHTML = `${maxInput.value}${symbol}`;
      RenderCards.sortCards()
      QueryParamsHandler.updateURL(title, minInput.value, maxInput.value)
    });
  }

  static addEventListenerToSliders() {
    if (!this.areEventListenersSet) {
      this.areEventListenersSet = true;
      SliderFilter.sliderEvent(0)
      SliderFilter.sliderEvent(1)
    }
  }

  static sortBySlider(arr: IProduct[] = products.slice()): IProduct[] {
    const getElem = (classSelector: string): string => {
      return (document.querySelector(`.${classSelector}`) as HTMLInputElement).value;
    }

    const priceMin = getElem('slider-block__price-range-min');
    const priceMax = getElem('slider-block__price-range-max');
    const stockMin = getElem('slider-block__stock-range-min');
    const stockMax = getElem('slider-block__stock-range-max');

    const resultCardsArr = arr.filter(item => {
      return ((item.price <= Number(priceMax) && item.price >= Number(priceMin))
        && (item.stock <= Number(stockMax) && item.stock >= Number(stockMin)));
    })

    return resultCardsArr
  }

  static render() {
    this.areEventListenersSet = false;

    SliderFilter.renderSlider(0)
    SliderFilter.renderSlider(1)
    SliderFilter.addEventListenerToSliders()
    SliderFilter.sortBySlider()
  }
}

export const enum SliderClasses {
  priceMin = 'slider-block__price-range-min',
  priceMax = 'slider-block__price-range-max',
  stockMin = 'slider-block__stock-range-min',
  stockMax = 'slider-block__stock-range-max',
}
