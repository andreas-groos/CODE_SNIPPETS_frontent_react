// Set up your root reducer here...
import { combineReducers } from "redux";
//  export default combineReducers;
import { routerReducer } from "react-router-redux";
import userReducer from "./userReducer";
import testReducer from "./testReducer";
import snippetReducer from "./snippetReducer";
import uiReducer from "./uiReducer";
import formReducer from "./formReducer";

export default combineReducers({
  user: userReducer,
  routing: routerReducer,
  test: testReducer,
  form: formReducer,
  snippet: snippetReducer,
  ui: uiReducer
});
