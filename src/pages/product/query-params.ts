import { rangeContent } from '../../core/data';
import { CheckboxFilter } from './checkbox';
import { RenderCards } from './render-cards';

export class QueryParams {

  static updateURL(key: string, value: string, rangeValue?: string) {
    let urlParams = new URL(window.location.href)
    let params = new URLSearchParams(urlParams.search)
    if (key === 'category' || key === 'brand') {
      if (params.has(key)) {
        if (params.get(key) === value) params.delete(key)
        let valuesArr: string[] | undefined = params.get(key)?.split('↕')
        let firstLength = valuesArr?.length;
        valuesArr = valuesArr?.filter(item => item != value)

        if (firstLength === valuesArr?.length) valuesArr?.push(value)
        let result: string | undefined = valuesArr?.join('↕');

        if (result) params.set(key, result)
      } else {
        params.append(key, value)
      }
    } else if (key === 'search') {
      if (params.has(key)) {
        value === ''
          ? params.delete(key)
          : params.set(key, value)
      } else {
        params.append(key, value)
      }
    } else if (key === 'Price' || key === 'Stock') {
      let result = value + "⟷" + rangeValue;
      params.has(key)
        ? params.set(key, result)
        : params.append(key, result)
    } else if (key === 'remove') {
      let arr: string[] = []
      for (const key of params.keys()) {
        if (arr) arr.push(key)
      }
      arr.forEach(item => {
        params.delete(item)
      })

    } else {
      params.has(key)
        ? params.set(key, value)
        : params.append(key, value)
    }
    let path = window.location.pathname + '?' + params.toString();
    history.pushState(null, '', path);
  }

  static queryFilterData(filter: string, sliderIndex?: number) {
    let urlParams = new URL(window.location.href)
    let params = new URLSearchParams(urlParams.search)
    let string = params.get(filter);
    if (filter === 'category') {
      if (string) {
        CheckboxFilter.categoryCheckedArr = string.split('↕')
      } else {
        CheckboxFilter.categoryCheckedArr = [];
      }
    } else if (filter === 'brand') {
      if (string) {
        CheckboxFilter.brandCheckedArr = string.split('↕')
      } else {
        CheckboxFilter.brandCheckedArr = [];
      }
    } else if (filter === 'Price' || filter === 'Stock') {
      if (string && sliderIndex != undefined) {
        let arr = string.split('⟷')
        rangeContent[sliderIndex].minValue = Number(arr[0])
        rangeContent[sliderIndex].maxValue = Number(arr[1])
      } else if (!string && sliderIndex != undefined) {
        rangeContent[sliderIndex].minValue = rangeContent[sliderIndex].min
        rangeContent[sliderIndex].maxValue = rangeContent[sliderIndex].max
      }
    } else if (filter === 'big' || filter === 'sort' || filter === 'search') {
      if (params.has(filter)) {
        return params.get(filter)
      } else {
        return null
      }
    }
  }
}