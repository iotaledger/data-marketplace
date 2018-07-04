import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/home';
import SensorPage from './pages/sensor';
import CookiesPage from './pages/cookies';
import DashboardPage from './pages/dashboard';
import WhitelistPage from './pages/whitelist';

const Router = () => (
  <Switch>
    <Route path="/" component={HomePage} exact />
    <Route path="/dashboard" component={DashboardPage} />
    <Route path="/sensor/:id" component={SensorPage} />
    <Route path="/cookies" component={CookiesPage} />
    <Route path="/whitelist" component={WhitelistPage} />
    <Route component={HomePage} />
  </Switch>
);

export default Router;
