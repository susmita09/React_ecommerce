import * as actionTypes from "../constants/productConstants";
import axios from "axios";
import { setHeaders } from "../api";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:8000/api";

//actioncerater
export const getProducts = (category, home) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      category
        ? `${BASE_URL}/products/findall?category=${category}`
        : home
        ? `http://localhost:8000/api/products/findall?new=${home}`
        : `http://localhost:8000/api/products/findall`
    );
    // console.log(data);
    category
      ? dispatch({
          type: actionTypes.GET_PRODUCTS_SUCCESS_CATEGORY,
          payload: data,
        })
      : dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload: data });
    //the corresponsing reducer will be called
  } catch (err) {
    // console.log("err ehile call getproducts", err.message);
    dispatch({ type: actionTypes.GET_PRODUCT_FAIL, payload: err.message });
  }
};

//async action creater with dispatch
//DETAILS PRODUCT

export const getProductDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/products/find/${id}`);
    dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

//create product action creater

export const createProductAction = (details) => async (dispatch) => {
  // console.log(details);
  try {
    dispatch({ type: actionTypes.CREATE_PRODUCT_REQUEST });
    const response = await axios.post(
      `${BASE_URL}/products/create`,
      details,
      setHeaders()
    );
    dispatch({
      type: actionTypes.CREATE_PRODUCT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    // dispatch({ type: actionTypes.CREATE_PRODUCT_FAIL, payload: error.message });
    toast.error(error.response.data, { position: "top-right" });
  }
};

//DELETE PRODUCT ADMIN
export const deleteProduct = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/products//delete/${id}`,
      setHeaders()
    );
     console.log(response.data);
    dispatch({
      type: actionTypes.DELETE_PRODUCT_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    // dispatch({ type: actionTypes.DELETE_PRODUCT_FAIL, payload: err.message });
    toast.error(err.response.data, { position: "top-right" });
  }
};

//EDIT PRODUCT

export const editProductAction = (details,id) => async (dispatch) => {
  // console.log(details);
  try {
    // dispatch({ type: actionTypes.CREATE_PRODUCT_REQUEST });
    const response = await axios.put(
      `${BASE_URL}/products/update/${id}`,
      details,
      setHeaders()
    );
    dispatch({
      type: actionTypes.EDIT_PRODUCT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
     dispatch({ type: actionTypes.EDIT_PRODUCT_FAIL, payload: error.message });
    toast.error(error.response.data, { position: "top-right" });
  }
};
