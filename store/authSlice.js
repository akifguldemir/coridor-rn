import { createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/AuthService";
import LocalStorage from "../utils/LocalStorage";

const initialState = {
  userType: null,
  user: null,
  isLoggedIn: null,
  token: null,
  refreshToken: null,
  activationEmail: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkIsLoggedInAuth(state) {
      if (state.isLoggedIn) return true;
      else false;
    },
    signUpAuth(state, action) {
      // LocalStorage.setItem("activationMail", action.payload.email);
      state.activationEmail = action.payload.email;
      // return AuthService.signUp(action.payload);
    },
    loginAuth(state, action) {
      console.log(action.payload)
    },
    logoutAuth(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.token = null;
      state.refreshToken = null;
      // localStorage.removeItem("user");
      // localStorage.removeItem("token");
      // localStorage.removeItem("refreshToken");
      // localStorage.removeItem("userType");
    },
  },
});

export const { checkIsLoggedInAuth, signUpAuth, loginAuth, logoutAuth } =
  authSlice.actions;

export const logout = () => (dispatch) => {
  dispatch(logoutAuth);
};

export const getToken = () => (dispatch) => {
  return dispatch(getToken);
};

export const renewToken = () => (dispatch) => {
  return dispatch(renewToken);
};

export const signUp = (data) => (dispatch) => {
};

export const login = (data) => (dispatch) => {
  console.log(data)
  console.log(123)
  dispatch(loginAuth(data));
};

export default authSlice.reducer;
