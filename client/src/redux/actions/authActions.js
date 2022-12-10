import axios from "axios";
import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FALIURE,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_REQUEST,
  SIGN_OUT_FALIURE,
  LOAD_USER,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FALIURE,
} from "../constants/authConstants";

const BASE_URL = "http://localhost:8000/api";

const signUpRequest = () => {
  return {
    type: SIGN_UP_REQUEST,
  };
};

const signUpSuccess = (token) => {
  return {
    type: SIGN_UP_SUCCESS,
    payload: token,
  };
};

const signUpFailure = (error) => {
  return {
    type: SIGN_UP_FALIURE,
    payload: error,
  };
};

export const signUp = (user) => async (dispatch) => {
  dispatch(signUpRequest());

  try {
    const token = await axios.post(`${BASE_URL}/auth/register`, {
      name: user.name,
      email: user.email,
      password: user.password,
    });
    localStorage.setItem("token", token.data);
    dispatch(signUpSuccess(token.data)); //the corresponsing reducer will be called
  } catch (error) {
    // console.log("err ehile call getproducts", err.message);
    dispatch(signUpFailure(error));
  }
};

//sign in

export const signIn = (user) => async (dispatch) => {
  dispatch({
    type: SIGN_IN_REQUEST,
  });

  try {
    const token = await axios.post(`${BASE_URL}/auth/login`, {
      email: user.email,
      password: user.password,
    });
    localStorage.setItem("token", token.data);
    dispatch({
      type: SIGN_IN_SUCCESS,
      payload: token.data,
    }); //the corresponsing reducer will be called
  } catch (error) {
    // console.log("err ehile call getproducts", err.message);
    dispatch({ type: SIGN_IN_FALIURE, payload: error });
  }
};

export const signOut = () => (dispatch) => {
  dispatch({ type: SIGN_OUT_REQUEST });
  localStorage.clear();
  if (localStorage.getItem("token")) {
    dispatch({ type: SIGN_OUT_FALIURE });
  } else {
    dispatch({ type: SIGN_OUT_SUCCESS });
  }
};

export const loadUser = () => (dispatch) => {
  dispatch({ type: LOAD_USER });
};
