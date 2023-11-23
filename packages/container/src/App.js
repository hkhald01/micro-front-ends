import React, { lazy, Suspense, useState } from 'react';
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
  const [isSignedIn, setIsSignedIn] = useState(false);

  const isSignedInHandler = () => {
    setIsSignedIn(true);
  };
  const onSignOutHandler = () => {
    setIsSignedIn(false);
  };
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header
            isSignedIn={isSignedIn}
            onSignOut={onSignOutHandler}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path='/auth'>
                <AuthLazy onSignIn={isSignedInHandler} />
              </Route>
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
