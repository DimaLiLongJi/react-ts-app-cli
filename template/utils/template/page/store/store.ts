import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducers, { persisted } from './reducers';
import fetchMiddleware from 'Utils/fetch-middleware';
import * as root from 'window-or-global';

Object.keys(persisted).forEach(k => {
  const r: any = persisted[k];
  persisted[k] = persistReducer({
    // debug: true,
    key: `tutor_reducer_${k}`,
    storage,
    blacklist: ['subscription', 'newQuestionArray'],
    serialize: true,
  }, r);
});

const reducer: any = {
  ...reducers,
  ...persisted,
};

const middlewares: any = [thunkMiddleware, fetchMiddleware];

const storeEnhancers: any = compose(
  applyMiddleware(...middlewares),
  (root && root.devToolsExtension) ? root.devToolsExtension() : ((f: any) => f),
);

const store: any = createStore(combineReducers(reducer), root.__INITIAL_STATE__, storeEnhancers);

export const persistor: any = persistStore(store);

export { storage };

export default store;
