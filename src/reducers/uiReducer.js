import {
  SET_ERROR,
  CLEAR_ERROR,
  SELECT_ALL,
  SELECT_STARRED
} from "../constants/actionTypes.js";
import initialState from "./initialState.js";

export default function uiReducer(state = initialState.ui, action) {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, error: action.err };
    case CLEAR_ERROR:
      return { ...state, error: null };
    case SELECT_ALL:
      return { ...state, selection: "ALL" };
    case SELECT_STARRED:
      return { ...state, selection: "STARRED" };
    default:
      return state;
  }
}
