import { createSlice, configureStore } from "@reduxjs/toolkit";
import AuthService from "../services/AuthService";

const initialState = {
  userType: localStorage.getItem("userType"),
  user: localStorage.getItem("user"),
  isLoggedIn: !(
    localStorage.getItem("token") === undefined ||
    localStorage.getItem("token") === null
  ),
  isQuestLoggedIn: !(
    localStorage.getItem("token") === undefined ||
    localStorage.getItem("token") === null
  ),
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refreshToken"),
  activationEmail: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkIsLoggedInAuth(state) {
      if (state.isLoggedIn) return true;
      else false;
    },
    signUpAuth(state, action) {
      localStorage.setItem("activationMail", action.payload.email);
      state.activationEmail = action.payload.email;
      return AuthService.signUp(action.payload);
    },
    loginAuth(state, action) {},
    logoutAuth(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.token = null;
      state.refreshToken = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userType");
    },
  },
});

export const { checkIsLoggedInAuth, signUpAuth, loginAuth, logoutAuth } =
  authSlice.actions;

export const logout = () => (dispatch) => {
  dispatch(logout);
};

export const getToken = () => (dispatch) => {
  return dispatch(getToken);
};

export const renewToken = () => (dispatch) => {
  return dispatch(renewToken);
};

export const signUp = (data) => (dispatch) => {
  console.log(data)
  return dispatch(signUpAuth(data));
};

export default authSlice.reducer;
