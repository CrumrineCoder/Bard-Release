import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  HashRouter,
  ConnectedRouter
} from 'react-router-dom';
import { connect } from 'react-redux';

import PrivateRoute from './privateRoute';
import HomePage from '../components/homepage';
import LoginPage from '../components/loginPage';
import RegisterPage from '../components/registerPage';
import MusicPage from '../components/musicPage';
import Header from '../components/Header';
import { turnoffOverlayAction } from '../actions/linkActions';

import HomepageContainer from './HomepageContainer';

function App(props) {
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    if (props.store.overlay) {
      if (props.store.overlay.response) {
        setOverlay(props.store.overlay.response.overlay);
      }
    }

  }, [props.store.overlay])

  return (
    <HashRouter>
      <div id="app">
        <Header setOverlay={setOverlay} overlay={overlay} />

        <div onClick={() => props.dispatch(turnoffOverlayAction())} className={overlay ? "appContainer active" : "appContainer"}>
          <Switch>
            <Route path='/' exact={true} component={HomepageContainer} />
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={RegisterPage} />
            <Route path='/music' component={MusicPage} />
          </Switch>
        </div>
      </div>
    </HashRouter>
  );

}

const mapStateToProps = (store) => ({ store });
export default connect(mapStateToProps)(App);