import axios, { AxiosError } from 'axios'

const request = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'https://sports-tv.vercel.app/api/proxy/'
      : '/api/proxy/',
})

// Add a request interceptor
request.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// Add a response interceptor
request.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    handleError(error)
    return Promise.reject(error)
  }
)

function handleError(error: AxiosError) {
  if (error.response) {
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
  } else if (error.request) {
    console.error(error.request)
  } else {
    console.error('Error', error.message)
  }
  console.error(error.config)
}

export default request
