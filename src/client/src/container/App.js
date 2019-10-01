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
import LoginPage from '../components/loginPage';
import RegisterPage from '../components/registerPage';
import Header from '../components/Header';
import Overlay from '../components/Overlay';
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
//onClick={() => props.dispatch(turnoffOverlayAction())} 
  return (
    <HashRouter>
      <div id="app">
        <Header setOverlay={setOverlay} overlay={overlay} />
        <Overlay></Overlay>
        <div className={overlay ? "appContainer" : "appContainer"}>
          <Switch>
            <Route path='/' exact={true} component={HomepageContainer} />
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={RegisterPage} />
          </Switch>
        </div>
      </div>
    </HashRouter>
  );

}

const mapStateToProps = (store) => ({ store });
export default connect(mapStateToProps)(App);