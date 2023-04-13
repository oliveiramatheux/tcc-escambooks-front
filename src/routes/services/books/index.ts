import axiosInstance from '../axios'
import { AxiosPromise } from 'axios'

export interface PayloadBookCreate {
  title: string,
  authors: string[],
  publisher: string,
  publishedDate: string,
  description: string,
  pageCount: number,
  categories: string[],
  imageLinks?: {
    thumbnail: string
  },
  language: string,
  previewLink?: string,
}

export interface BookCreateRetunData {
  id: string,
  userId: string,
  title: string,
  authors: string[],
  publisher: string,
  publishedDate: string,
  description: string,
  pageCount: number,
  categories: string[],
  imageLinks?: {
    thumbnail: string
  },
  language: string,
  previewLink?: string,
}

const bookCreateService = (payload: PayloadBookCreate): AxiosPromise => {
  return axiosInstance.post('/books', payload)
}

export { bookCreateService }
