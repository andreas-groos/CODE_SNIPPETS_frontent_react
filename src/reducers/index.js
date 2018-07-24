// Set up your root reducer here...
 import { combineReducers } from 'redux';
//  export default combineReducers;
 import {routerReducer} from 'react-router-redux'

 export default combineReducers({
  routing: routerReducer
});