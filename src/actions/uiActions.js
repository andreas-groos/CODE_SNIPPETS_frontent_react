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

export function selectAll() {
  return {
    type: types.SELECT_ALL
  };
}

export function selectStarred() {
  return {
    type: types.SELECT_STARRED
  };
}

export function selectCategory(category) {
  return {
    type: types.SELECT_CATEGORY,
    category
  };
}

export function selectSnippet(_id) {
  return {
    type: types.SELECT_SNIPPET,
    _id
  };
}
