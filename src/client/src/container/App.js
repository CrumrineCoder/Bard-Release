import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch, 
  HashRouter,
  ConnectedRouter
} from 'react-router-dom';

import PrivateRoute from './privateRoute';
import LoginPage from '../components/loginPage';
import RegisterPage from '../components/registerPage';
import DashboardPage from '../components/dashboardPage';
import Header from '../components/Header';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div id="app">
          <Header />
          <div className="appContainer">
            <Switch>
              <Route path='/' exact={true} component={LoginPage} />
              <Route path='/login' component={LoginPage} />
              <Route path='/register' component={RegisterPage} />
              <PrivateRoute path='/dashboard' component={DashboardPage} />
            </Switch>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;