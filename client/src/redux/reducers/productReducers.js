import * as actionTypes from "../constants/productConstants";
import { toast } from "react-toastify";


const initialState = {
  products: [],
  catProduct: [],
  status: null,
  careateProductStatus: null,
  err: "",
  deleteStatus: null,
  editStatus : null,
};

export const getProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload, status: "success" };
    case actionTypes.GET_PRODUCTS_SUCCESS_CATEGORY:
      return { ...state, catProduct: action.payload, status: "success" };
    case actionTypes.GET_PRODUCT_FAIL:
      return { ...state, err: action.payload, status: "fail" };
    default:
      return state;
  }
};

//CREATE PRODUCT REDUCER

export const createProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_PRODUCT_REQUEST:
      return { ...state, careateProductStatus: "pending" };
    case actionTypes.CREATE_PRODUCT_SUCCESS:
      const newList = [...state.products, action.payload];
      toast.success(`Product Created!  `, {
        position: "top-center",
      });
      return { ...state, products: newList, careateProductStatus: "success" };
    case actionTypes.CREATE_PRODUCT_FAIL:
      return { ...state, careateProductStatus: "fail" };
    default:
      return state;
  }
};

export const getProductDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case actionTypes.GET_PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//DELETE PRODUCT REDUCER

export const deleteProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DELETE_PRODUCT_REQUEST:
      return { ...state, deleteStatus: "pending" };

    case actionTypes.DELETE_PRODUCT_SUCCESS:
      const newList = state.products.filter((item) => item._id !== action.payload._id);
       
       toast.success(`Product deleted!  `, {
        position: "top-center",
      });
      return { ...state, products: newList, deleteStatus: "success" };

    case actionTypes.DELETE_PRODUCT_FAIL:
      return { ...state, deleteStatus: "fail" };
    default:
      return state;
  }
};


//edit product
//CREATE PRODUCT REDUCER

export const editProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case actionTypes.EDIT_PRODUCT_SUCCESS:
      const newList = [...state.products, action.payload];
      toast.success(`Product updated!  `, {
        position: "top-center",
      });
      return { ...state, products: newList, editStatus: "success" };
    case actionTypes.EDIT_PRODUCT_FAIL:
      return { ...state, editStatus: "fail" };
    default:
      return state;
  }
};
