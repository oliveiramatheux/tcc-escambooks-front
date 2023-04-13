import { BookTypes, IBooksState, IBookActions } from './types'

const initialState: IBooksState = {
  books: [],
  loading: false,
  failure: false
}

export default function booksReducer (
  state = initialState,
  action: IBookActions
): IBooksState {
  switch (action.type) {
  case BookTypes.CREATE_BOOK:
    return {
      ...state,
      loading: true
    }

  case BookTypes.CREATE_BOOK_SUCCESS:
    return {
      ...state,
      ...action.payload,
      loading: false
    }

  case BookTypes.CREATE_BOOK_FAILURE:
    return {
      ...state,
      loading: false,
      failure: true
    }

  default:
    return state
  }
}
