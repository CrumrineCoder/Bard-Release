import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './container/App'

import './Buttons.scss';
import './App.scss';


import configureStore from './store/configureStore';
const store = configureStore();
render(
  // <Provider store={store}>
  //  <App />
  // </Provider>,
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root')
)