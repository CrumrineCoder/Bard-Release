import React, { Fragment } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  HashRouter,
  ConnectedRouter
} from 'react-router-dom';
import { connect } from 'react-redux';

import Homepage from "../components/homepage.js"
import MusicPage from "../components/musicPage.js"


function HomepageContainer(props) {

  return (
    <Fragment>
        <Homepage></Homepage>
        <MusicPage></MusicPage>
    </Fragment>
  );

}

const mapStateToProps = (store) => ({ store });
export default connect(mapStateToProps)(HomepageContainer);