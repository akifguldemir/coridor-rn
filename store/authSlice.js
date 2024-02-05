import { createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/AuthService";
import LocalStorage from "../utils/LocalStorage";

const initialState = {
  userType: null,
  user: null,
  isLoggedIn: false,
  token: null,
  refreshToken: null,
  activationEmail: null,
  isLoading: false,
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
      // return AuthService.signUp(action.payload);
    },
    loginSuccess(state, action) {
      state.isLoggedIn = true
      state.token = action.payload.token
      state.refreshToken = action.payload.refreshToken
      state.email = action.payload.email
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
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
  middleware:[]
});

export const { checkIsLoggedInAuth, signUpAuth, loginSuccess, logoutAuth, setLoading } =
  authSlice.actions;

export const logout = () => (dispatch) => {
  dispatch(logoutAuth);
};

export const getToken = () => (dispatch) => {
};

export const renewToken = () => (dispatch) => {
};

export const signUp = (data) => (dispatch) => {};

export const login = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await AuthService.login(data);
    if (response.status === 200) {
      response.data.email = data.email
      dispatch(loginSuccess(response.data));
    }
  } catch (error) {
    // Hata durumlarına göre işlemler
  } finally {
    dispatch(setLoading(false));
  }
};

export default authSlice.reducer;
