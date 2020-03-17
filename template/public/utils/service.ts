import axios, { AxiosRequestConfig } from 'axios';
import { Config } from "Constants/config";

export type TypeHttpRequest = <V = any>(config?: AxiosRequestConfig) => Promise<Typings.HLJResponse<V>>;

// set interceptors of axios
axios.interceptors.request.use((config) => config, (err) => Promise.resolve(err));

// axios.interceptors.response.use((res) => res.data, (err) => Promise.resolve(err));

/**
 * function getMethod for for http request of method get
 *
 * @export
 * @template V
 * @param {string} [url]
 * @param {AxiosRequestConfig} [config={}]
 * @returns {Promise<Typings.HLJResponse<V>>}
 */
export async function getMethod<V = any>(url?: string, config: AxiosRequestConfig = {}): Promise<Typings.HLJResponse<V>> {
  return (await axios({
    url,
    headers: {
      'HEADER-MOOAO-AC': sessionStorage.getItem(Config.activityIdKey), 
    },
    ...config,
    method: 'get',
  })).data;
}

/**
 * function postMethod for for http request of method post
 *
 * @export
 * @template V
 * @param {string} [url]
 * @param {AxiosRequestConfig} [config={}]
 * @returns {Promise<Typings.HLJResponse<V>>}
 */
export async function postMethod<V = any>(url?: string, config: AxiosRequestConfig = {}): Promise<Typings.HLJResponse<V>> {
  return (await axios({
    url,
    headers: {
      'HEADER-MOOAO-AC': sessionStorage.getItem(Config.activityIdKey), 
    },
    ...config,
    method: 'post',
  })).data;
}

/**
 * function putMethod for for http request of method put
 *
 * @export
 * @template V
 * @param {string} [url]
 * @param {AxiosRequestConfig} [config={}]
 * @returns {Promise<Typings.HLJResponse<V>>}
 */
export async function putMethod<V = any>(url?: string, config: AxiosRequestConfig = {}): Promise<Typings.HLJResponse<V>> {
  return (await axios({
    url,
    headers: {
      'HEADER-MOOAO-AC': sessionStorage.getItem(Config.activityIdKey), 
    },
    ...config,
    method: 'put',
  })).data;
}

/**
 * function deleteMethod for for http request of method delete
 *
 * @export
 * @template V
 * @param {string} [url]
 * @param {AxiosRequestConfig} [config={}]
 * @returns {Promise<Typings.HLJResponse<V>>}
 */
export async function deleteMethod<V = any>(url?: string, config: AxiosRequestConfig = {}): Promise<Typings.HLJResponse<V>> {
  return (await axios({
    url,
    headers: {
      'HEADER-MOOAO-AC': sessionStorage.getItem(Config.activityIdKey), 
    },
    ...config,
    method: 'delete',
  })).data;
}

export default axios;
