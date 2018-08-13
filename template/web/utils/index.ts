import * as moment from 'moment';
import * as qs from 'qs';
import { persistor } from '../store/store';

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

export function debounce(fn: Function, delay?: Number): Function {
  let timeoutId = 0;
  return (...args: Array<any>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, (delay || 100));
  };
}

export function interval(fn: Function, delay?: Number) {
  let timeoutId = 0;
  return (...args: Array<any>) => {
    if (timeoutId) return;
    fn(...args);
    timeoutId = setTimeout(() => {
      timeoutId = 0;
    }, delay || 100);
  };
}

export function parseUrlParams(props: any) {
  if (!window) return {};
  const qsParams = (window.location.search.length && qs.parse(window.location.search.substring(1))) || {};
  const out = Object.assign({}, qsParams, props.match ? props.match.params : {});
  Object.keys(out).forEach(k => {
    const val = out[k];
    if (/^\d+$/.test(val)) out[k] = Number(val);
  });
  return out;
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


export const logout = () => {
  persistor.purge()
    .then(() => {
      window.location.href = `/api/auth/logout?redirectUrl=${encodeURIComponent(location.pathname)}`;
    });
};

export const flush = () => {
  persistor.flush();
};
