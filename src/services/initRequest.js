import axios from 'axios';

import { showLoading, hideLoading } from 'actions/app.action';

export const axiosInstance = axios.create({
  baseURL: 'https://tony-auth-express.herokuapp.com',
  showSpinner: false
})

export const axiosInstanceJsonPlaceholder = axios.create({
  baseURL: 'https://tony-json-server.herokuapp.com',
  showSpinner: false
})

export default function initRequest(store) {
  let requestCount = 0;

  function desreaseRequestCount() {
    requestCount -= 1;
    if(requestCount === 0) {
      store.dispatch(hideLoading())
    }
  }

  axiosInstance.interceptors.request.use(
    config => {
      if(config.showSpinner) {
        requestCount += 1;
        store.dispatch(showLoading())
      }
      return config
    },
    error => {
      if(error.config.showSpinner) {
        desreaseRequestCount()
      }
      return Promise.reject(error)
    }
  )

  axiosInstance.interceptors.response.use(
    res => {
      if(res.config.showSpinner) {
        desreaseRequestCount()
      }
      return res
    },
    error => {
      if(error && error.config.showSpinner) {
        desreaseRequestCount()
      }
      return Promise.reject(error)
    }
  )

  axiosInstanceJsonPlaceholder.interceptors.request.use(
    config => {
      if(config.showSpinner) {
        requestCount += 1;
        store.dispatch(showLoading())
      }
      return config
    },
    error => {
      if(error.config.showSpinner) {
        desreaseRequestCount()
      }
      return Promise.reject(error)
    }
  )

  axiosInstanceJsonPlaceholder.interceptors.response.use(
    res => {
      if(res.config.showSpinner) {
        desreaseRequestCount()
      }
      return res
    },
    error => {
      if(error && error.config.showSpinner) {
        desreaseRequestCount()
      }
      return Promise.reject(error)
    }
  )
}