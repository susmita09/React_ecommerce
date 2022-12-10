import * as actionTypes from "../constants/orderConstants";

const initialState = {
     userorder : [],
     usererror : ""
  };

  
  export const getUserOrderReducer = (state = initialState, action) => {
    switch (action.type) {
      // case actionTypes.GET_ORDER_REQUEST:
      //   return { ...state, status: "pending" };
      case actionTypes.GET_USER_ORDER_SUCCESS:
        return { ...state, userorder :  action.payload };
  
      case actionTypes.GET_USER_ORDER_ERROR:
        return { ...state,  usererror : action.payload};
      default:
        return state;
    }
  };