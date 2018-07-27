import { SAVE_SNIPPET } from "../constants/actionTypes";

import initialState from "./initialState.js";

export default function snippetReducer(state = initialState.user, action) {
  switch (action.type) {
    // case SAVE_SNIPPET:
    //   let { displayName, uid } = action.user;
    //   return { ...state, displayName, uid };
    // case USER_LOGOUT:
    //   return null;
    default:
      return state;
  }
}
