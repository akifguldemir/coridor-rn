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
    checkIsLoggedIn(state) {
      if (state.isLoggedIn) return true;
      else false;
    },
    getToken(state) {
      return state.token;
    },
    renewToken(state, action) {
      state.token = null;
      if (state.refreshToken != null) {
        return AuthService.renewToken(state.refreshToken).then(
          async (response) => {
            if (response.data !== undefined && response.status === 200) {
              state.isLoggedIn = true;
              state.token = response.data.token;
              state.refreshToken = response.data.refresh_token;

              localStorage.setItem("token", response.data.token);
              localStorage.setItem("refreshToken", response.data.refresh_token);
            }
            return response;
          }
        );
      }
    },
    signUp(state, action) {
      localStorage.setItem("activationMail", action.payload.email);
      state.activationEmail = action.payload.email;
      return AuthService.signUp(formData)
    },
    login(state, action) {
      // AuthService.login fonksiyonunu buraya entegre etmek gerekebilir.
    },
    questlogin(state, action) {
      // AuthService.questlogin fonksiyonunu buraya entegre etmek gerekebilir.
    },
    logout(state) {
      // AuthService.logout fonksiyonunu buraya entegre etmek gerekebilir.
    },
    activationCode(state, action) {
      // AuthService.activationCode fonksiyonunu buraya entegre etmek gerekebilir.
    },
    resendActivationCode(state) {
      const formData = {
        email: localStorage.getItem("activationMail"),
      };
      // AuthService.resendActivationCode fonksiyonunu buraya entegre etmek gerekebilir.
    },
    forgotPassword(state, action) {
      // AuthService.forgotPassword fonksiyonunu buraya entegre etmek gerekebilir.
    },
    updatePlatform(state) {
      if (state.token !== null && state.token !== undefined) {
        // AuthService.updatePlatform fonksiyonunu buraya entegre etmek gerekebilir.
      }
    },
  },
});

export const { actions, reducer } = authSlice;

export const store = configureStore({
  reducer: {
    auth: reducer,
  },
});
