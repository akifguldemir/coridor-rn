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
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.email = action.payload.email;
      LocalStorage.setItem("token", action.payload.token);
      LocalStorage.setItem("refreshToken", action.payload.refreshToken);
      LocalStorage.setItem("email", action.payload.email);
    },
    setLogin(state, action) {
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
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
  middleware: [],
});

export const {
  checkIsLoggedInAuth,
  signUpAuth,
  loginSuccess,
  setLogin,
  logoutAuth,
  setLoading,
} = authSlice.actions;

export const logout = () => async (dispatch) => {
  await LocalStorage.removeItem("user");
  await LocalStorage.removeItem("token");
  await LocalStorage.removeItem("refreshToken");
  dispatch(logoutAuth);
};

export const getToken = () => (dispatch) => {};

export const renewToken = () => (dispatch) => {};

export const signUp = (data) => (dispatch) => {};

export const login =
  (data, isFirstLogin = true) =>
  async (dispatch) => {
    try {
      if (isFirstLogin) {
        dispatch(setLoading(true));

        const response = await AuthService.login(data);
        console.log(response)
        if (response.status === 200) {
          response.data.email = data.email;
          dispatch(loginSuccess(response.data));
        }
      } else {
        const data = {
          token: await LocalStorage.getItem("token"),
          refreshToken: await LocalStorage.getItem("refreshToken"),
          email: await LocalStorage.getItem("email"),
        };

        dispatch(setLogin(data))
      }
    } catch (error) {
      // Hata durumlarına göre işlemler
    } finally {
      dispatch(setLoading(false));
    }
  };

export default authSlice.reducer;
