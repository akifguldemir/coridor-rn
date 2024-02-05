/* eslint-disable */
import axios from "axios";
import Toast from "react-native-toast-message";

const lastErrorMessage = "";

const BASE_URL = "http://192.168.1.71:8000/api";

axios.defaults.baseURL = BASE_URL;

// axios.interceptors.request.use(
//   function (config) {
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// axios.interceptors.response.use(
//   function (response) {
//     return response
//   },
//   async function (error) {
//     const authStore = useAuthStore()
//     const originalRequest = error.config
//     if (error.response.status === 401 && error.response.data.message === 'Expired JWT Token') {
//       console.log(error.response.data.message)
//     }

//     console.log(error.response.status, originalRequest.url)
//     if (
//       (error.response.status === 401 || error.response.status === 404) &&
//       originalRequest.url.includes('api/token/refresh')
//     ) {
//       console.log('refresh token didnt work')
//       authStore.logout()
//       return Promise.reject(error)
//     } else if (error.response.status === 401 && !originalRequest._retry) {
//       console.log('retry!')
//       originalRequest._retry = true
//       await authStore.renewToken()
//       originalRequest.headers.Authorization = `Bearer ${authStore.token}`
//       return axios(originalRequest)
//     }
//     return Promise.reject(error)
//   }
// )
// axios.interceptors.request.use(request => {
//   console.log('Starting Request', request)
//   return request;
// });

// axios.interceptors.response.use(response => {
//   console.log('Response:', response);
//   return response;
// });

export class BaseService {
  handleSuccess(response) {
    const resultMessage =
      (response && response.data && response.data.message) ||
      response.message ||
      response.toString();
    if (resultMessage === "[object Object]") return;
    console.log(resultMessage)
    Toast.show({
      type: "success",
      text1: "Hello",
      text2: "başarılı",
    });
  }
  handleError(error) {
    console.log(error);
    let errorMessage = "Undefined error!";
    if (undefined !== error.response) {
      errorMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
    }

    if (errorMessage === "Missing JWT Refresh Token")
      errorMessage = "Lütfen kullanıcı bilgilerinizi kontrol ediniz.";
    if (errorMessage === "Invalid credentials.")
      errorMessage = "Kullanıcı bilgileriniz hatalı.";

    if (
      errorMessage !== lastErrorMessage &&
      errorMessage !== "Internal Server Error" &&
      errorMessage !== "Undefined error!"
    ) {
      Toast.show({
        type: "error",
        text1: errorMessage,
      });
      // lastErrorMessage = errorMessage
    } else {
      console.log("Service error:", errorMessage);
    }
    return error;
  }
  getFullPath(path) {
    return BASE_URL + path;
  }
  get(path) {
    return axios
      .get(this.getFullPath(path), {
        headers: {
          "content-type": "application/json",
        },
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }
  post(path, formData, options = {handleSuccess: true, handleError: true}) {
    return axios
      .post(this.getFullPath(path), formData, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then(
        (response) => {
          if(undefined!== options.handleSuccess && options.handleSuccess) this.handleSuccess(response)
          return response;
        },
        (error) => {
          if(undefined!== options.handleError && options.handleError) this.handleError(error)
          return error;
        }
      )
      .catch((error) => {
        this.handleError(error);
        return error;
      });
  }
}
/* eslint-disable */
