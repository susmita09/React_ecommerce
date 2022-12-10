import * as actionItems from "../constants/authConstants";
import jwtDecode from "jwt-decode";

const initialState = {
  token: localStorage.getItem("token"),
  name: "",
  email: "",
  id: "",
  isAdmin: false,
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  loading: false,
};

export const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionItems.SIGN_UP_REQUEST:
      return {
        ...state,
        loading: true,
        registerStatus: "pending",
      };

    case actionItems.SIGN_UP_SUCCESS:
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          id: user.id,
          isAdmin: user.isAdmin,
          registerStatus: "success",
          loading: false,
        };
      } else return state;

    case actionItems.SIGN_UP_FALIURE:
      return {
        ...state,
        registerError: action.payload,
        registerStatus: "rejected",
        loading: false,
      };

    case actionItems.SIGN_IN_REQUEST:
      return {
        ...state,
        loading: true,
        loginStatus: "pending",
      };
    case actionItems.SIGN_IN_SUCCESS:
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          id: user.id,
          isAdmin: user.isAdmin,
          loginStatus: "success",
          loading: false,
        };
      } else return state;
    case actionItems.SIGN_IN_FALIURE:
      return {
        ...state,
        loginError: action.payload,
        loginStatus: "rejected",
        loading: false,
      };

    case actionItems.SIGN_OUT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case actionItems.SIGN_OUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: "",
        name: "",
        email: "",
        id: "",
        isAdmin: false,
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
        loading: false,
      };

    case actionItems.LOAD_USER:
      const token = state.token;
      if (token) {
        const user = jwtDecode(token);
        return {
          ...state,
          token,
          name: user.name,
          email: user.email,
          id: user.id,
          loading: false,
          isAdmin: user.isAdmin,
        };
      } else return { ...state };

    default:
      return { ...state };
  }
};
