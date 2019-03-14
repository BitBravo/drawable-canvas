import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import Login from 'containers/Login/Loadable';
import Signup from 'containers/Signup/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import './style.scss';

const App = () => (
  <div className="app-wrapper">
    <Helmet
      titleTemplate="%s - Car Recognization System"
      defaultTitle="Car Recognization System"
    >
      <meta name="description" content="Car Recognization System" />
    </Helmet>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route path="/register" component={Signup} />
      <Route path="/" component={HomePage} />
      <Route path="" component={NotFoundPage} />
    </Switch>
  </div>
);

export default App;
