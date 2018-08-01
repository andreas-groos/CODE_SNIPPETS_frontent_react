import {
  UPDATE_FORM_VALUES,
  CLEAR_FORM,
  SET_ALL_FORM_VALUES
} from "../constants/actionTypes.js";
import initialState from "./initialState.js";

export default function formReducer(state = initialState.form, action) {
  switch (action.type) {
    case UPDATE_FORM_VALUES:
      let { value, field } = action;
      return { ...state, [field]: value };
    case CLEAR_FORM:
      return {};
    case SET_ALL_FORM_VALUES:
      return { ...state, ...action.values };
    default:
      return state;
  }
}
