import { IBookActions, BookTypes } from './types'
import { PayloadBookCreate } from '../../routes/services/books'

export const createBookAction = (payload: PayloadBookCreate): IBookActions => ({
  type: BookTypes.CREATE_BOOK,
  payload
})
