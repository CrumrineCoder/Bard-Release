import { combineReducers } from 'redux';
import register from './registerReducer';
import {login} from './loginReducer';
import dashboard from './dashboardReducer';
import overlay from "./overlayReducer";

const rootReducer = combineReducers({
  register, login, dashboard, overlay
});

export default rootReducer;