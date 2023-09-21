import { all, fork, StrictEffect } from 'redux-saga/effects'

import userSagas from './users/sagas'
import booksSagas from './books/sagas'
import preferencesSagas from './preferences/sagas'

export default function * rootSaga (): Generator<StrictEffect> {
  return yield all([
    fork(userSagas),
    fork(booksSagas),
    fork(preferencesSagas)
  ])
}
