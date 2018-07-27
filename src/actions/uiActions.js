import * as types from "../constants/actionTypes";

export function showEditor(show) {
  return {
    type: types.SHOW_EDITOR,
    show
  };
}
