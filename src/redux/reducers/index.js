import { combineReducers } from 'redux';
import catalog from './catalog';
import auth from './auth';
export default combineReducers({
  catalog: catalog,
  auth: auth,
});
