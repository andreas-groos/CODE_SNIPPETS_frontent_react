import * as types from "../constants/actionTypes";

export function showEditor(show) {
  return {
    type: types.SHOW_EDITOR,
    show
  };
}

export function setError(err) {
  return {
    type: types.SET_ERROR,
    err
  };
}

export function clearError() {
  return {
    type: types.CLEAR_ERROR
  };
}
