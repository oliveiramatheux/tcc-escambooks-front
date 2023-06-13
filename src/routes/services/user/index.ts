import axiosInstance from '../axios'
import { AxiosPromise } from 'axios'

export interface PayloadUserCreate {
  email: string
  name: string
  password: string
  birthDate?: string
}

export interface PayloadUserUpdate {
  email?: string
  name?: string
  birthDate?: string
  imageUrl?: string
  imageName?: string
}

export interface User {
  id: string
  name: string
  email: string
  birthDate: string
  imageUrl?: string
  imageName?: string
}

const userCreate = async (payload: PayloadUserCreate): AxiosPromise => {
  return await axiosInstance.post('/users', payload)
}

const userUpdate = async (id: string, payload: PayloadUserUpdate): AxiosPromise => {
  return await axiosInstance.patch(`/users/${id}`, payload)
}

const getUserById = async (id: string): Promise<User | undefined> => {
  try {
    const { data } = await axiosInstance.get(`/users/${id}`)
    return data
  } catch {
    return undefined
  }
}

export { userCreate, getUserById, userUpdate }
