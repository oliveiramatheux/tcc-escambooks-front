import { combineReducers } from 'redux'
import user from './users'
import books from './books'
import { IUserState } from './users/types'
import { IBooksState } from './books/types'

export interface ApplicationState {
  user: IUserState
  books: IBooksState
}

export default combineReducers({
  user,
  books
})
