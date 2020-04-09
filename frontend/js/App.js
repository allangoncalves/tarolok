import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import Home from './pages/Home';
import SentryBoundary from './utils/SentryBoundary';

const App = () => (
  <SentryBoundary>
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  </SentryBoundary>
);

export default hot(App);
