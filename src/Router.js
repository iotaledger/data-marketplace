import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './pages/home';
import SensorPage from './pages/sensor';
import CookiesPage from './pages/cookies';
import DashboardPage from './pages/dashboard';
import WhitelistPage from './pages/whitelist';
import { storeProjectSettings } from './store/settings/actions';

class Router extends Component {
  componentDidMount() {
    this.props.storeProjectSettings();
  }

  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/sensor/:id" component={SensorPage} />
          <Route path="/cookies" component={CookiesPage} />
          <Route path="/whitelist" component={WhitelistPage} />
          <Route component={HomePage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  storeProjectSettings: () => dispatch(storeProjectSettings()),
});

export default connect(
  null,
  mapDispatchToProps
)(Router);
