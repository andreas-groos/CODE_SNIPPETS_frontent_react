import * as types from "../constants/actionTypes";

export function updateFormValues(field, value) {
  return {
    type: types.UPDATE_FORM_VALUES,
    field,
    value
  };
}

export const clearForm = () => ({
  type: types.CLEAR_FORM
});

export function setAllFormValues(values) {
  return {
    type: types.SET_ALL_FORM_VALUES,
    values
  };
}
