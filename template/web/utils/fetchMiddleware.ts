// 1. 拦截所有拥有url参数的action，对该url进行网络请求
// 2. 参数的传递参考axios的api
// 3. 传递staged: true 可以获得不同阶段分别触发action的行为

import axios from 'axios';

export default function fetchMiddleware(store: any): any {
  return (next: any) => (action: any) => {
    if (!action.url) {
      return next(action);
    }
    if (action.staged) {
      next({
        ...action,
        stage: 'start',
      });
    }
    action.method = action.method || 'GET';

    return axios(action)
      .then((res) => {
        next({
          ...action,
          stage: 'result',
          result: res.data,
        });
        return res;
      })
      .catch((err) => {
        next({
          ...action,
          // type: 'REQUEST_ERROR',
          originalType: action.type,
          stage: 'error',
          error: err.response.data,
        });
        return Promise.reject(err.response.data);
      });
  };
}
