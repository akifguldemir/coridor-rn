/* eslint-disable */ 
import axios from 'axios'
import { useAuthStore } from '../store/auth'
// import { useToast } from 'vue-toastification'

// const toast = useToast()
const lastErrorMessage = ''

const BASE_URL = (process.env.VUE_APP_API_BASE_URL !== undefined) ? process.env.VUE_APP_API_BASE_URL + '/api' : 'http://127.0.0.1:8000/api'

axios.defaults.baseURL = BASE_URL

axios.interceptors.request.use(
    function (config) {
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )
  
  axios.interceptors.response.use(
    function (response) {
      return response
    },
    async function (error) {
      const authStore = useAuthStore()
      const originalRequest = error.config
      if (error.response.status === 401 && error.response.data.message === 'Expired JWT Token') {
        console.log(error.response.data.message)
      }
  
      console.log(error.response.status, originalRequest.url)
      if (
        (error.response.status === 401 || error.response.status === 404) &&
        originalRequest.url.includes('api/token/refresh')
      ) {
        console.log('refresh token didnt work')
        authStore.logout()
        return Promise.reject(error)
      } else if (error.response.status === 401 && !originalRequest._retry) {
        console.log('retry!')
        originalRequest._retry = true
        await authStore.renewToken()
        originalRequest.headers.Authorization = `Bearer ${authStore.token}`
        return axios(originalRequest)
      }
      return Promise.reject(error)
    }
  )

export class BaseService {
getFullUrl (path) {
    return BASE_URL + path
}

getHeaders () {
    const authStore = useAuthStore()
        let headers = { 'Content-Type': 'application-json' }
        if (undefined !== authStore.getToken() && authStore.getToken() !== null) {
          headers = { ...headers, ...{ Authorization: `Bearer ${authStore.getToken()}` } }
          return { headers }
        }
        return headers
    }
handleSuccess (response) {
    const resultMessage = (response && response.data && response.data.message) || response.message || response.toString()
    if (resultMessage === '[object Object]') return
    // toast.success(resultMessage)
  }
handleError (error) {
  console.log(error)
    let errorMessage = 'Undefined error!'
    if (undefined !== error.response) {
      errorMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    }

    if (errorMessage === 'Missing JWT Refresh Token') errorMessage = 'Lütfen kullanıcı bilgilerinizi kontrol ediniz.'
    if (errorMessage === 'Invalid credentials.') errorMessage = 'Kullanıcı bilgileriniz hatalı.'

    if (
      errorMessage !== lastErrorMessage &&
        errorMessage !== 'Internal Server Error' &&
        errorMessage !== 'Undefined error!'
    ) {
      // toast.error(errorMessage)
      // lastErrorMessage = errorMessage
    } else {
      console.log('Service error:', errorMessage)
    }
    return error
  }

post (path, formData) {
  console.log('//POST--->')
  console.log(path)
  console.log(formData)
  console.log('//<--POST')
    return axios
      .post(this.getFullUrl(path), formData, this.getHeaders()).then(
        response => {
          this.handleSuccess(response)
          return response
        },
        error => {
          this.handleError(error)
          return error
        }
      ).catch(
        error => {
          this.handleError(error)
          return error
        }
      )
  }
  put (path, formData) {
    return axios
      .put(this.getFullUrl(path), formData, this.getHeaders()).then(
        response => {
          this.handleSuccess(response)
          console.log(response)
          return response
        },
        error => {
          this.handleError(error)
          return error
        }
      ).catch(
        error => {
          this.handleError(error)
          return error
        }
      )
  }
  get (path) {
    return axios
      .get(this.getFullUrl(path), this.getHeaders()).then(
        response => {
          this.handleSuccess(response)
          console.log(response)
          return response
        },
        error => {
          this.handleError(error)
          return error
        }
      ).catch(
        error => {
          this.handleError(error)
          return error
        }
      )
  }


}
 /* eslint-disable */ 

