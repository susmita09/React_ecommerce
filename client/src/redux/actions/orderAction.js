import * as actionTypes from "../constants/orderConstants";
import axios from "axios";
import { setHeaders } from "../api";

const BASE_URL = "http://localhost:8000/api";

//actioncerater
export const getAllOrders = () => async (dispatch) => {
  dispatch({ type: actionTypes.GET_ORDER_REQUEST });
  try {
    const { data } = await axios.get(
      `${BASE_URL}/orders/findall`,
      setHeaders()
    );
    dispatch({ type: actionTypes.GET_ORDER_SUCCESS, payload: data });
    //the corresponsing reducer will be called
  } catch (err) {
    dispatch({ type: actionTypes.GET_ORDER_FAIL, payload: err.message });
  }
};

//get usser based orders

export const getUserOrder = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/orders/find/${userId}`,
      setHeaders()
    );
    
    dispatch({ type: actionTypes.GET_USER_ORDER_SUCCESS, payload: data });
    //the corresponsing reducer will be called
  } catch (err) {
    dispatch({ type: actionTypes.GET_USER_ORDER_ERROR, payload: err.message });
  }
};


//Edit order

export const ordersEdit = ({ id, delivary_status }) => async (
  dispatch,
  getState
) => {
  // console.log(id);
  // console.log(delivary_status)
  dispatch({ type: actionTypes.EDIT_ORDER_REQUEST });
  const state = getState();
  const currOrder = state.ordersState.orders.filter(
    (order) => order._id === id
  ); //it will retuen an array

  const newOrder = {
    ...currOrder[0],
    status: delivary_status,
  };

  try {
    const { data } = await axios.put(
      `${BASE_URL}/orders/edit/${id}`,
      newOrder,
      setHeaders()
    );
    dispatch({ type: actionTypes.EDIT_ORDER_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: actionTypes.EDIT_ORDER_FAIL, payload: err.message });
  }
};
