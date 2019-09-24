import React, { useState } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  HashRouter,
  ConnectedRouter
} from 'react-router-dom';

import PrivateRoute from './privateRoute';
import HomePage from '../components/homepage';
import LoginPage from '../components/loginPage';
import RegisterPage from '../components/registerPage';
import MusicPage from '../components/musicPage';
import Header from '../components/Header';

function App(props) {
  const [overlay, setOverlay] = useState(false);

  return (
    <HashRouter>
      <div id="app">
        {overlay}
        <Header setOverlay={setOverlay} overlay={overlay}/>
        <div onClick={()=>setOverlay(false)} className={overlay ?"appContainer active" : "appContainer"}>
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

export default App;