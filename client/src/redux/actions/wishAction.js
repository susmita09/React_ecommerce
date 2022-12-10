import * as actionItems from "../constants/wishConstants";

export const addToWishList = (product) => (dispatch, getState) => {
  console.log(product);
  dispatch({ type: actionItems.ADD_TO_WISH, payload: product });
};

export const removeFromWishList = (item) => (dispatch) => {
  dispatch({ type: actionItems.REMOVE_FROM_WISH, payload: item });
};
