import axios from 'axios';

export const get: any = (url: string, params: any) => new Promise((resolve, reject) => {
  const pms = params ? { params } : null;
  axios.get(url, pms)
    .then(res => {
      resolve(res.data);
    })
    .catch(e => {
      reject(e.response.data);
    });
});

export const remove: any = (url: string, params: any) => new Promise((resolve, reject) => {
  const pms = params ? { params } : null;
  axios.delete(url, pms)
    .then(res => {
      resolve(res.data);
    })
    .catch(e => {
      reject(e.response.data);
    });
});

export const post: any = (url: string, params: any) => new Promise((resolve, reject) => {
  axios.post(url, params)
    .then(res => {
      resolve(res.data);
    })
    .catch(e => {
      reject(e.response.data);
    });
});

export const put: any = (url: string, params: any) => new Promise((resolve, reject) => {
  axios.put(url, params)
    .then(res => {
      resolve(res.data);
    })
    .catch(e => {
      reject(e.response.data);
    });
});

export default axios;
