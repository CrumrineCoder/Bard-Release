import React, { Fragment } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  HashRouter,
  ConnectedRouter
} from 'react-router-dom';
import { connect } from 'react-redux';

import MusicPage from "../components/musicPage.js"
import MusicSearchBar from "../components/musicSearchBar.js"


function HomepageContainer(props) {

  return (
    <Fragment>
        <MusicSearchBar></MusicSearchBar>
        <MusicPage></MusicPage>
    </Fragment>
  );

}

const mapStateToProps = (store) => ({ store });
export default connect(mapStateToProps)(HomepageContainer);