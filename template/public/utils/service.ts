import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

export type TypeHttpRequest = <V = any>(config?: AxiosRequestConfig) => AxiosPromise<V>;

// set interceptors of axios
axios.interceptors.request.use((config) => config, (err) => Promise.resolve(err));

axios.interceptors.response.use((res) => res.data, (err) => Promise.resolve(err));

/**
 * function getMethod for for http request of method get
 *
 * @export
 * @template V
 * @param {string} [url]
 * @param {AxiosRequestConfig} [config={}]
 * @returns {AxiosPromise<V>}
 */
export function getMethod<V = any>(url?: string, config: AxiosRequestConfig = {}): AxiosPromise<V> {
  return axios({
    url,
    ...config,
    method: 'get',
  });
}

/**
 * function postMethod for for http request of method post
 *
 * @export
 * @template V
 * @param {string} [url]
 * @param {AxiosRequestConfig} [config={}]
 * @returns {AxiosPromise<V>}
 */
export function postMethod<V = any>(url?: string, config: AxiosRequestConfig = {}): AxiosPromise<V> {
  return axios({
    url,
    ...config,
    method: 'post',
  });
}

/**
 * function putMethod for for http request of method put
 *
 * @export
 * @template V
 * @param {string} [url]
 * @param {AxiosRequestConfig} [config={}]
 * @returns {AxiosPromise<V>}
 */
export function putMethod<V = any>(url?: string, config: AxiosRequestConfig = {}): AxiosPromise<V> {
  return axios({
    url,
    ...config,
    method: 'put',
  });
}

/**
 * function deleteMethod for for http request of method delete
 *
 * @export
 * @template V
 * @param {string} [url]
 * @param {AxiosRequestConfig} [config={}]
 * @returns {AxiosPromise<V>}
 */
export function deleteMethod<V = any>(url?: string, config: AxiosRequestConfig = {}): AxiosPromise<V> {
  return axios({
    url,
    ...config,
    method: 'delete',
  });
}

export default axios;
