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
  admin?: boolean
}

interface UserBookImageInfo {
  bookId: string
  bookImageName: string
}

export type DeletedUserResponse = User & {
  userBooksImages: UserBookImageInfo[]
}

const userCreate = async (payload: PayloadUserCreate): AxiosPromise => {
  return await axiosInstance.post('/users', payload)
}

const updateUserById = async (id: string, payload: PayloadUserUpdate): Promise<User | undefined> => {
  try {
    const { data } = await axiosInstance.patch(`/users/${id}`, payload)
    return data
  } catch {
    return undefined
  }
}

const getUserById = async (id: string): Promise<User | undefined> => {
  try {
    const { data } = await axiosInstance.get(`/users/${id}`)
    return data
  } catch {
    return undefined
  }
}

const deleteUserById = async (id: string): Promise<DeletedUserResponse | undefined> => {
  try {
    const { data } = await axiosInstance.delete(`/users/${id}`)
    return data
  } catch {
    return undefined
  }
}

const getAllUsers = async (): Promise<User[]> => {
  try {
    const { data } = await axiosInstance.get<User[]>('/admin/users')
    return data
  } catch {
    return []
  }
}

const getUsersByName = async (name: string): Promise<User[]> => {
  try {
    const { data } = await axiosInstance.get<User[]>(`/users/username/${name}`)
    return data || []
  } catch {
    return []
  }
}

export { userCreate, getUserById, updateUserById, deleteUserById, getAllUsers, getUsersByName }
