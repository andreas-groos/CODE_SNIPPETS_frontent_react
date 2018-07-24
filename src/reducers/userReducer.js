import { USER_LOGIN, USER_LOGOUT } from "../constants/actionTypes.js";
import initialState from "./initialState.js";

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case USER_LOGIN:
      return { ...action.user };
    case USER_LOGOUT:
      return null;
    default:
      return state;
  }
}
