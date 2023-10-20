import { combineReducers } from 'redux'
import user from './users'
import books from './books'
import preferences from './preferences'
import { IUserState } from './users/types'
import { IBooksState } from './books/types'
import { IPreferencesState } from './preferences/types'

export interface ApplicationState {
  preferences: IPreferencesState
  user: IUserState
  books: IBooksState
}

export default combineReducers({
  user,
  books,
  preferences
})
