import { rangeContent } from '../../../core/data/types';
import { CheckboxFilter } from './CheckboxFilter';
import { URLSearchKeys } from '../../../core/data/types';
import { PageIDs } from '../../../core/templates/page';

export class QueryParamsHandler {

  static updateURL(key: string, value: string, rangeValue?: string) {
    const urlParams = new URL(window.location.href)
    const params = new URLSearchParams(urlParams.search)
    if (key === URLSearchKeys.category || key === URLSearchKeys.brand) {
      if (params.has(key)) {
        if (params.get(key) === value) params.delete(key)
        let valuesArr: string[] | undefined = params.get(key)?.split('↕')
        const firstLength = valuesArr?.length;
        valuesArr = valuesArr?.filter(item => item != value)

        if (firstLength === valuesArr?.length) valuesArr?.push(value)
        const result: string | undefined = valuesArr?.join('↕');

        if (result != null) params.set(key, result)
      } else params.append(key, value)
    } else if (key === URLSearchKeys.selector) {
      if (params.has(key)) {
        value === ''
          ? params.delete(key)
          : params.set(key, value)
      } else params.append(key, value)
    } else if (key === URLSearchKeys.price || key === URLSearchKeys.stock) {
      const result = value + "⟷" + rangeValue;
      params.has(key)
        ? params.set(key, result)
        : params.append(key, result)
    } else if (key === URLSearchKeys.remove) {
      const arr: string[] = []
      for (const key of params.keys()) {
        arr.push(key)
      }
      arr.forEach(item => {
        params.delete(item)
      })
    } else {
      params.has(key)
        ? params.set(key, value)
        : params.append(key, value)
    }
    const path = window.location.pathname + '?' + params.toString();
    const hash = `#${PageIDs.MainPage}`;
    const state = path + hash;

    history.pushState(null, '', state);
  }

  static queryFilterData(filter: string, sliderIndex?: number) {
    const urlParams = new URL(window.location.href)
    const params = new URLSearchParams(urlParams.search)
    const string = params.get(filter);
    if (filter === URLSearchKeys.category) {
      (string != null)
        ? CheckboxFilter.categoryCheckedArr = string.split('↕')
        : CheckboxFilter.categoryCheckedArr = [];
    } else if (filter === URLSearchKeys.brand) {
      (string != null)
        ? CheckboxFilter.brandCheckedArr = string.split('↕')
        : CheckboxFilter.brandCheckedArr = [];
    } else if (filter === URLSearchKeys.price || filter === URLSearchKeys.stock) {
      if ((string != null) && sliderIndex != undefined) {
        const arr = string.split('⟷')
        rangeContent[sliderIndex].minValue = Number(arr[0])
        rangeContent[sliderIndex].maxValue = Number(arr[1])
      } else if ((string == null) && sliderIndex != undefined) {
        rangeContent[sliderIndex].minValue = rangeContent[sliderIndex].min
        rangeContent[sliderIndex].maxValue = rangeContent[sliderIndex].max
      }
    } else {
      if (params.has(filter)) {
        return params.get(filter)
      } else {
        return null
      }
    }
  }
}