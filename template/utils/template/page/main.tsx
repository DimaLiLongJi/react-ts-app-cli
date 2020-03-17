import '../../styles/style.less';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Route, Switch } from 'react-router';
import * as VConsole from 'vconsole';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store, { persistor } from './store/store';
import { Config } from 'Constants/config';

import App from './app';

if (process.env.NODE_ENV !== 'prod') {
  const vconsole = new (VConsole as any)();
}

const app: React.ReactChild = (
  <BrowserRouter basename = {`${Config.pageRoot}/$needReplacePathToken$`}>
    <div className="route-wrapper">
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </div>
  </BrowserRouter>
);

ReactDOM.render(
  (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        {app}
      </Provider>
    </PersistGate>
  ),
  document.getElementById('root'));
