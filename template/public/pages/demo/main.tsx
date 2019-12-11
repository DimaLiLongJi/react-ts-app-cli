import '../../styles/style.less';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Route, Switch } from 'react-router';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store, { persistor } from './store/store';
import * as projectConfig from '../../../project.config.json';

import App from './app';

console.log(222222, process.env);

const app: React.ReactChild = (
  <BrowserRouter basename = {`${(process.env.config as any).baseUrl}/demo`}>
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
