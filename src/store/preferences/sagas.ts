import { all, takeLatest, StrictEffect, put } from 'redux-saga/effects'
import { PreferencesTypes } from './types'

export function * toggleDarkMode (): Generator<StrictEffect> {
  try {
    yield put({
      type: PreferencesTypes.TOGGLE_DARK_MODE
    })
  } catch (error) {
    console.log(error)
  }

  // localStorage.setItem('token', data.token)
}

export default function * preferencesSagas (): Generator<StrictEffect> {
  yield all([
    takeLatest(PreferencesTypes.TOGGLE_DARK_MODE, toggleDarkMode)
  ])
}
