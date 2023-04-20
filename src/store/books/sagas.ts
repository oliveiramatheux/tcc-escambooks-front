import { all, takeLatest, StrictEffect, put, call } from 'redux-saga/effects'
import { BookTypes, ICreateBookAction } from './types'
import { bookCreateService, BookCreateRetunData } from '../../routes/services/books'
import { AxiosResponse } from 'axios'

export function * bookCreate (action: ICreateBookAction): Generator<StrictEffect> {
  try {
    const response = yield call(bookCreateService, action.payload)

    const { data } = response as AxiosResponse<BookCreateRetunData>

    if (!data) throw new Error('Failed to create book')

    yield put({
      type: BookTypes.CREATE_BOOK_SUCCESS,
      payload: data
    })
  } catch {
    yield put({
      type: BookTypes.CREATE_BOOK_FAILURE
    })
  }
}

export default function * booksSagas (): Generator<StrictEffect> {
  yield all([
    takeLatest(BookTypes.CREATE_BOOK, bookCreate)
  ])
}
