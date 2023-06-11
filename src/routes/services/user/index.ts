import axiosInstance from '../axios'
import { AxiosPromise } from 'axios'

export interface payloadUserCreate {
  email: string
  name: string
  password: string
  birthDate?: string
}

export interface User {
  id: string
  name: string
  email: string
  birthDate: string
  imageUrl?: string
}

const userCreate = async (payload: payloadUserCreate): AxiosPromise => {
  return await axiosInstance.post('/users', payload)
}

const getUserById = async (id: string): Promise<User | undefined> => {
  try {
    const { data } = await axiosInstance.get(`/users/${id}`)
    return data
  } catch {
    return undefined
  }
}

const getCurrentUser = async (): Promise<User | undefined> => {
  try {
    const { data } = await axiosInstance.get('/users')
    return data
  } catch {
    return undefined
  }
}

export { userCreate, getUserById, getCurrentUser }
