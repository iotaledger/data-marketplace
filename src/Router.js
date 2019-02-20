import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import HomePage from './pages/home';
import DemoPage from './pages/demo';
import TechSpecsPage from './pages/specs';
import BusinessPage from './pages/business';
import GetInvolvedPage from './pages/involved';
import SensorPage from './pages/sensor';
import DashboardPage from './pages/dashboard';
import WhitelistPage from './pages/whitelist';
import FaucetPage from './pages/faucet';
import { storeProjectSettings } from './store/settings/actions';

class Router extends Component {
  componentDidMount() {
    this.props.storeProjectSettings();
  }

  render() {
    return (
      <CookiesProvider>
        <HashRouter>
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/demo" component={DemoPage} />
            <Route path="/specs" component={TechSpecsPage} />
            <Route path="/business" component={BusinessPage} />
            <Route path="/involved" component={GetInvolvedPage} />
            <Route path="/dashboard" component={DashboardPage} />
            <Route path="/sensor/:deviceId" component={SensorPage} />
            <Route path="/whitelist" component={WhitelistPage} />
            <Route path="/faucet" component={FaucetPage} />
            <Route component={HomePage} />
          </Switch>
        </HashRouter>
      </CookiesProvider>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  storeProjectSettings: () => dispatch(storeProjectSettings()),
});

export default connect(null, mapDispatchToProps)(Router);
