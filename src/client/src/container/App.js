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

function App(props) {
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    console.log(overlay);
  }, [overlay])

  useEffect(() => {
    console.log(props.store.overlay);
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

        <div onClick={() => setOverlay(false)} className={overlay ? "appContainer active" : "appContainer"}>
          <Switch>
            <Route path='/' exact={true} component={HomePage} />
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