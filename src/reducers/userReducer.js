import {
  USER_LOGIN,
  USER_LOGOUT,
  SET_USER_TOKEN
} from "../constants/actionTypes.js";
import initialState from "./initialState.js";

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case USER_LOGIN:
      let { displayName, uid } = action.user;
      return { ...state, displayName, uid };
    case USER_LOGOUT:
      localStorage.removeItem("token");
      return null;
    case SET_USER_TOKEN:
      localStorage.setItem("token", action.token);
      return { ...state, token: action.token };
    default:
      return state;
  }
}
