import { AxiosError } from 'axios'

const defaultErrorInterceptor = (error: AxiosError): Promise<AxiosError> =>
  Promise.reject(error)

export default defaultErrorInterceptor
