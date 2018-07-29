import { SET_ERROR, CLEAR_ERROR } from "../constants/actionTypes.js";
import initialState from "./initialState.js";

export default function uiReducer(state = initialState.ui, action) {
  switch (action.type) {
    case SET_ERROR:
      return { error: action.err };
    case CLEAR_ERROR:
      return { error: null };
    default:
      return state;
  }
}
