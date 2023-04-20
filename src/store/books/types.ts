import { BookCreateRetunData, PayloadBookCreate } from '../../routes/services/books'

export enum BookTypes {
  CREATE_BOOK = '@BOOK/CREATE_BOOK',
  CREATE_BOOK_SUCCESS = '@BOOK/CREATE_BOOK_SUCCESS',
  CREATE_BOOK_FAILURE = '@BOOK/CREATE_BOOK_FAILURE',
}

export interface IBook {
  id?: string
  userId: string
  title: string
  authors: string[]
  publisher: string
  publishedDate: string
  description: string
  pageCount: number
  categories: string[]
  imageLinks?: {
    thumbnail: string
  }
  language: string
  previewLink?: string
}

export interface IBooksState {
  books: IBook[]
  loading: boolean
  failure: boolean
}

export interface ICreateBookAction {
  type: typeof BookTypes.CREATE_BOOK
  payload: PayloadBookCreate
}

interface ICreateBookSuccessAction {
  type: typeof BookTypes.CREATE_BOOK_SUCCESS
  payload: BookCreateRetunData
}

interface ICreateBookFailureAction {
  type: typeof BookTypes.CREATE_BOOK_FAILURE
}

export type IBookActions =
    | ICreateBookAction
    | ICreateBookSuccessAction
    | ICreateBookFailureAction
