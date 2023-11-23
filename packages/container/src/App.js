import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';

import Header from './components/Header';
import Progress from './components/Progress';
// import AuthApp from './components/AuthApp';
// import MarketingApp from './components/MarketingApp';

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'cn',
});
export default () => {
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route
                path='/auth'
                component={AuthLazy}
              />
              <Route
                path='/'
                component={MarketingLazy}
              />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
