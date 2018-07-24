import { TEST_ACTION } from "../constants/actionTypes.js";
import initialState from "./initialState.js";

export default function testReducer(state = initialState.test, action) {
  switch (action.type) {
    case TEST_ACTION:
      return { time: new Date() };
    default:
      return state;
  }
}
