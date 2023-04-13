import { AxiosError } from 'axios'

const defaultErrorInterceptor = async (error: AxiosError): Promise<AxiosError> =>
  await Promise.reject(error)

export default defaultErrorInterceptor
