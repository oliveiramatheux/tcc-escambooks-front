import axiosInstance from '../axios'
import { AxiosPromise } from 'axios'

export interface payloadUserCreate {
  email: string
  name: string
  password: string
}

const userCreate = async (payload: payloadUserCreate): AxiosPromise => {
  return await axiosInstance.post('/users', payload)
}

export { userCreate }
