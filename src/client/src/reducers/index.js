import { combineReducers } from 'redux';
import register from './registerReducer';
import {login} from './loginReducer';
import dashboard from './dashboardReducer';
import overlay from "./overlayReducer";
import tags from "./tagReducer";

const rootReducer = combineReducers({
  register, login, dashboard, overlay, tags
});

export default rootReducer;