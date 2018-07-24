import * as types from "../constants/actionTypes";

export function userLogin(user) {
  return {
    type: types.USER_LOGIN,
    user
  };
}

export function userLogout() {
  return {
    type: types.USER_LOGOUT
  };
}
