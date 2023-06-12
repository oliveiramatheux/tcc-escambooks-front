import axiosInstance from '../axios'
import { UploadBookByIdPayload } from './types'

export interface PayloadBookCreate {
  title: string
  authors: string[]
  publisher: string
  publishedDate: string
  description: string
  pageCount: number
  categories: string[]
  imageUrl?: string
  imageName?: string
  language: string
  previewLink?: string
}

export interface BookCreateRetunData {
  id: string
  userId: string
  title: string
  authors: string[]
  publisher: string
  publishedDate: string
  description: string
  pageCount: number
  categories: string[]
  imageUrl?: string
  imageName?: string
  language: string
  previewLink?: string
}

export interface Book {
  id: string
  userId: string
  title: string
  authors: string[]
  publisher: string
  publishedDate: string
  description: string
  pageCount: number
  categories: string[]
  imageUrl?: string
  imageName?: string
  language: string
  previewLink?: string
  date: string
  userName?: string
  userEmail?: string
  alreadyLike?: {
    likeId: string
  }
}

export interface BooksData {
  items: Book[]
  totalItems: number
}

const bookCreateService = async (payload: PayloadBookCreate): Promise<BookCreateRetunData | undefined> => {
  try {
    const { data } = await axiosInstance.post<BookCreateRetunData>('/books', payload)
    return data
  } catch {
    return undefined
  }
}

const getAllBooks = async (): Promise<Book[]> => {
  try {
    const { data } = await axiosInstance.get<BooksData>('/books/list')
    return data.items || []
  } catch {
    return []
  }
}

const updateBookById = async (bookId: string, payload: UploadBookByIdPayload): Promise<Book | undefined> => {
  try {
    const { data } = await axiosInstance.patch<Book>(`/books/${bookId}`, payload)
    return data
  } catch {
    return undefined
  }
}

const deleteBookById = async (bookId: string): Promise<Book | undefined> => {
  try {
    const { data } = await axiosInstance.delete<Book>(`/books/${bookId}`)
    return data
  } catch {
    return undefined
  }
}

export { bookCreateService, getAllBooks, updateBookById, deleteBookById }
