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

export function setUserToken(token) {
  return {
    type: types.SET_USER_TOKEN,
    token
  };
}
