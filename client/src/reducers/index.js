import { combineReducers } from 'redux';
import register from './registerReducer';
import login from './loginReducer';
import dashboard from './dashboardReducer';

const rootReducer = combineReducers({
  register, login, dashboard
});

export default rootReducer;