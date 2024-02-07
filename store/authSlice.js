import { createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    },
    setLogin(state, action) {
      state.isLoggedIn = true
      state.token = action.payload.token
      state.refreshToken = action.payload.refreshToken
      state.email = action.payload.email
    },
    logoutSuccess(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.token = null;
      state.refreshToken = null;
      console.log('Çıkış Başarılı')
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
  logoutSuccess,
  setLoading,
} = authSlice.actions;

export const clearToken = () =>  (dispatch) => {
  dispatch(logoutSuccess());
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
        if (response.status === 200) {
          console.log('Giriş başarılı')
          response.data.email = data.email;
          await AsyncStorage.setItem("token", response.data.token);
          await AsyncStorage.setItem("refreshToken", response.data.refreshToken);
          await AsyncStorage.setItem("email", response.data.email);
          dispatch(loginSuccess(response.data));
        }
      } else {
        const data = {
          token: await AsyncStorage.getItem("token"),
          refreshToken: await AsyncStorage.getItem("refreshToken"),
          email: await AsyncStorage.getItem("email"),
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
