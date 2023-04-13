import { AxiosResponse } from 'axios'

const defaultResponseInterceptor = (response: AxiosResponse): AxiosResponse =>
  response

export default defaultResponseInterceptor
