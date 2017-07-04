import applyMiddleware from 'redux/lib/applyMiddleware';
import combineReducers from 'redux/lib/combineReducers';
import createStore from 'redux/lib/createStore';
import compose from 'redux/lib/compose';

import thunk from 'redux-thunk';
import rootReducer from './reducers/';

export default function (initialState = {}) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));

}
