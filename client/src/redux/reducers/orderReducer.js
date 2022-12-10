import * as actionTypes from "../constants/orderConstants";

const initialState = {
  orders: [],
   
  status: null,
  err: "",
  editstatus: null,
};

export const getOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ORDER_REQUEST:
      return { ...state, status: "pending" };
    case actionTypes.GET_ORDER_SUCCESS:
      return { ...state, orders: action.payload, status: "success" };

    case actionTypes.GET_ORDER_FAIL:
      return { ...state, err: action.payload, status: "fail" };
    default:
      return state;
  }
};



//EDIT ORDERS
export const editOrderReducer = (state=initialState,action) =>{
  switch (action.type) {
    case actionTypes.EDIT_ORDER_REQUEST:
      return { ...state, editstatus: "pending" };
    case actionTypes.EDIT_ORDER_SUCCESS:
      const updatedOrders = state.orders.map((order)=>
        order._id === action.payload._id ? action.payload : order
      );
      return { ...state, orders: updatedOrders, editstatus: "success" };

    case actionTypes.EDIT_ORDER_FAIL:
      return { ...state, err: action.payload, editstatus: "fail" };
    default:
      return state;
  }
}
