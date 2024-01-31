import axios from 'axios'

const lastErrorMessage = ''



const BASE_URL = (process.env.API_BASE_URL !== undefined) ? process.env.API_BASE_URL + '/api' : 'http://localhost:8000/api'

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

    return Promise.reject(error)
  }
)

export class NonAuthBaseService {
  getFullUrl (path) {
    return BASE_URL + path
  }

  generateQSFromFilters (filters) {
    // eslint-disable-next-line
    filters = Object.entries(filters).reduce((a, [k, v]) => (v == null ? a : (a[k] = v, a)), {})
    // eslint-disable-next-line
    const qs = Object.entries(filters).map(([k, v]) => `${k}=${encodeURIComponent(typeof (v) === 'array' ? array.toString(v) : v)}`).join('&')
    return qs
  }


  getHeaders () {
    let clientType
    let clientId
    if(undefined === window) clientType = 'server.web'
    else clientType = 'client.web'
    if(undefined !== window) clientId = localStorage.getItem('apiClientStore.clientId')
    let headers = {  'accept': '*/*', 'Content-Type': 'application/json', 'Client-Type': clientType, 'Client-Id': clientId }
    try{
      let token = localStorage.getItem('token')
      if (undefined !== token && token !== null) {
        headers = { ...headers, ...{ Authorization: `Bearer ${token}` } }
      }
    } catch(err){}


    return headers
  }

  getConfig () {
    return { headers:this.getHeaders()  }
  }

  handleSuccess (response) {
    const resultMessage = (response && response.data && response.data.message) || response.message || response.toString()
    if (resultMessage === '[object Object]') return
    // toast.success(resultMessage)
  }

  handleError (error) {
    let errorMessage = 'Undefined error!'
    if (undefined !== error.response) {
      errorMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    }

    if (errorMessage === 'Missing JWT Refresh Token') errorMessage = 'Lütfen kullanıcı bilgilerinizi kontrol ediniz.'
    if (errorMessage === 'Invalid credentials.') errorMessage = 'Kullanıcı bilgileriniz hatalı.'

    if (
      errorMessage !== lastErrorMessage &&
      errorMessage !== 'Internal Server Error' &&
      errorMessage !== 'Undefined error!' &&
      errorMessage !== 'Request failed with status code 400' &&
      errorMessage !== 'Invalid credentials.' &&
      errorMessage !== 'JWT Token not found' &&
      errorMessage !== 'Missing JWT Refresh Token' &&
      errorMessage !== 'Invalid JWT Token'
    ) {
    //   toast.error(errorMessage)
      // lastErrorMessage = errorMessage
    } else {
      console.log('Service error:', errorMessage)
      console.log('*************', error)
    }
    return error
  }

  post (path, formData, options = {handleSuccess: true, handleError: true}) {
    return axios
      .post(this.getFullUrl(path), formData, this.getConfig()).then(
        response => {
          if(undefined!== options.handleSuccess && options.handleSuccess) this.handleSuccess(response)
          return response
        },
        error => {
          if(undefined!== options.handleError && options.handleError) this.handleError(error)
          return error
        }
      ).catch(
        error => {
          this.handleError(error)
          return error
        }
      )
  }

  get (path, options = {handleSuccess: true, handleError: true}) {
    return axios
      .get(this.getFullUrl(path), this.getConfig()).then(
        response => {
          if(undefined!== options.handleSuccess && options.handleSuccess) this.handleSuccess(response)
          return response
        },
        error => {
          if(undefined!== options.handleError && options.handleError) this.handleError(error)
          return error
        }
      ).catch(
        error => {
          this.handleError(error)
          return error
        }
      )
  }

  getCancellable (path, options = {handleSuccess: true, handleError: true}) {
    const abortController = new AbortController()
    const config = this.getHeaders()
    config.signal = abortController.signal
    const request = axios
      .get(this.getFullUrl(path), config).then(
        response => {
          if(undefined!== options.handleSuccess && options.handleSuccess) this.handleSuccess(response)
          return response
        },
        error => {
          if(undefined!== options.handleError && options.handleError) this.handleError(error)
          return error
        }
      ).catch(
        error => {
          this.handleError(error)
          return error
        }
      )
    return { request, abortController }
  }

  put (path, formData, options = {handleSuccess: true, handleError: true}) {
    return axios
      .put(this.getFullUrl(path), formData, this.getConfig()).then(
        response => {
          if(undefined!== options.handleSuccess && options.handleSuccess) this.handleSuccess(response)
          return response
        },
        error => {
          if(undefined!== options.handleError && options.handleError) this.handleError(error)
          return error
        }
      ).catch(
        error => {
          this.handleError(error)
          return error
        }
      )
  }

  delete (path, formData, options = {handleSuccess: true, handleError: true}) {
    return axios
      .delete(this.getFullUrl(path), {data: formData, headers:this.getHeaders()}).then(
        response => {
          if(undefined!== options.handleSuccess && options.handleSuccess) this.handleSuccess(response)
          return response
        },
        error => {
          if(undefined!== options.handleError && options.handleError) this.handleError(error)
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
