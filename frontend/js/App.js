import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { hot } from 'react-hot-loader/root';

import Home from './pages/Home';
import Login from './pages/Login';
import Repo from './pages/Repo';
import SentryBoundary from './utils/SentryBoundary';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <SentryBoundary>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/repos/:repoName">
            <Repo />
          </Route>
          <Route>
            <Home />
          </Route>
        </Switch>
      </Router>
    </SentryBoundary>
  );
};

export default hot(App);
