import * as actionTypes from "../constants/userConstants";
import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

//actioncerater
export const getAllUsers = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/users/findall`);
    console.log(data);
    dispatch({ type: actionTypes.GET_USER_SUCCESS, payload: data }); //the corresponsing reducer will be called
  } catch (err) {
    dispatch({ type: actionTypes.GET_USER_FAIL, payload: err.message });
  }
};
