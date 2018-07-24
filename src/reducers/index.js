// Set up your root reducer here...
import { combineReducers } from "redux";
//  export default combineReducers;
import { routerReducer } from "react-router-redux";
import userReducer from "./userReducer";
import testReducer from "./testReducer";

export default combineReducers({
  user: userReducer,
  routing: routerReducer,
  test: testReducer
});
