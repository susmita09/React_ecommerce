import * as actionTypes from "../constants/userConstants";

const initialState = {
  users: [],
  status: null,
  err: "",
};

export const getUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_SUCCESS:
      return { ...state, users: action.payload, status: "success" };
    case actionTypes.GET_USER_FAIL:
      return { ...state, err: action.payload, status: "fail" };
    default:
      return state;
  }
};
