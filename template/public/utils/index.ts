import * as moment from 'moment';
import * as qs from 'qs';

export function fd(d: Date): string {
  return moment(d).format('YYYY-MM-DD');
}
/**
 * 根据时区修改时间
 * @param {String} time
 * @param {String} utc
 * @param {格式} format
 */
export function changeTimezone(time: string, utc: string = '+08:00', format: string = 'YYYY-MM-DD HH:mm') {
  if (!time) return false;
  let day: any = moment(time).utcOffset(utc);
  day = day.format(format);
  return day;
}

export function fff(list: any, f1: any, val: any, f2: any) {
  const found = list.find((l: any) => l[f1] === val);
  return found && found[f2];
}

export function debounce(fn: Function, delay?: number): Function {
  let timeoutId: any = 0;
  return (...args: Array<any>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, (delay || 100));
  };
}

export function interval(fn: Function, delay?: number) {
  let timeoutId: any = 0;
  return (...args: Array<any>) => {
    if (timeoutId) return;
    fn(...args);
    timeoutId = setTimeout(() => {
      timeoutId = 0;
    }, delay || 100);
  };
}

export function parseUrlParams<T = any>(): T {
  // if (!window) return {};
  const qsParams: T = (window.location.search.length && qs.parse(window.location.search.substring(1))) || {};
  // Object.keys(qsParams).forEach(k => {
  //   const val = qsParams[k];
  //   if (/^\d+$/.test(val)) qsParams[k] = Number(val);
  // });
  return qsParams;
}

export function stringifyUrlParams(params: any) {
  if (!window || !params || !(params instanceof Object)) return '';
  const paramsObject = Object.assign({}, params);
  let out = '?';
  for (const key in paramsObject) {
    out += `${key}=${paramsObject[key]}&`;
  }
  return out.substr(0, out.length - 1);
}
