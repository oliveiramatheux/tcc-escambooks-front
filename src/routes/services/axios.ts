import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import config from '../../config'
import defaultResponseInterceptor from './interceptors/defaultResponseInterceptor'
import defaultErrorInterceptor from './interceptors/defaultErrorInterceptor'

const baseURL = `${config.serviceUrl}`

const headers: Record<string, string> = {
  Authorization: ''
}

if (localStorage.token) {
  headers.Authorization = `Bearer ${localStorage.token}`
  headers['admin-token'] = `${localStorage.adminToken}`
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers
})

axiosInstance.interceptors.response.use(
  defaultResponseInterceptor,
  defaultErrorInterceptor
)

export const addInterceptor = (
  successResponse: (value: AxiosResponse) => AxiosResponse,
  failureResponse: (error: AxiosError) => Promise<AxiosError>
): void => {
  axiosInstance.interceptors.response.use(successResponse, failureResponse)
}

export default axiosInstance
