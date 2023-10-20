import { all, takeLatest, StrictEffect, select } from 'redux-saga/effects'
import { ApplicationState } from '../rootReducer'
import { PreferencesTypes } from './types'

export function * toggleDarkMode (): Generator<StrictEffect> {
  const preferences = yield select((state: ApplicationState) => state.preferences)

  localStorage.setItem('preferences', JSON.stringify(preferences))
}

export default function * preferencesSagas (): Generator<StrictEffect> {
  yield all([
    takeLatest(PreferencesTypes.TOGGLE_DARK_MODE, toggleDarkMode)
  ])
}
