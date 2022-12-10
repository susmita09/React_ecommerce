import * as actionItems from "../constants/cartConstants";

export const addToCart = (product) => (dispatch, getState) => {
  console.log( product);
  dispatch({ type: actionItems.ADD_TO_CART, payload: product });
};

export const removeFromCart = (item) => (dispatch) => {
  dispatch({ type: actionItems.REMOVE_FROM_CART, payload: item });
};


export const increaseitemQuantity = (item) =>(dispatch) =>{
  dispatch({type : actionItems.INCREASE_QUANTITY,payload : item})
}

export const decreaseitemQuantity = (item) =>(dispatch) =>{
  dispatch({type : actionItems.DECREASE_QUANTITY,payload : item})
}

export const clearCartAction = () =>(dispatch) =>{
  dispatch({type : actionItems.CLEAR_CART, payload : null});
}