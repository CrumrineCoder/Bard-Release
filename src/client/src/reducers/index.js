import { combineReducers } from 'redux';
import register from './registerReducer';
import {login} from './loginReducer';
import dashboard from './dashboardReducer';
import overlay from "./overlayReducer";
import tags from "./tagReducer";
import comments from "./commentReducer";
import searchTags from "./searchTagReducer";

const rootReducer = combineReducers({
  register, login, dashboard, overlay, tags, comments, searchTags
});

export default rootReducer;