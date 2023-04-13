import axiosInstance from '../axios'
import { AxiosPromise } from 'axios'

export interface payloadUserCreate {
  email: string;
  name: string;
  password: string;
}

const userCreate = (payload: payloadUserCreate): AxiosPromise => {
  return axiosInstance.post('/users', payload)
}

export { userCreate }
