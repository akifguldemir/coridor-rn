/* eslint-disable */
import axios from "axios";
// import { useToast } from 'vue-toastification'

// const toast = useToast()
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
}
/* eslint-disable */
