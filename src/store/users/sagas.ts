import { all, takeLatest, StrictEffect, put, call } from 'redux-saga/effects'
import { UserTypes, IUserAuthGoogleAction, IUserAuthLoginAction, IUserLogin } from './types'
import { authLogin } from '../../routes/services/auth'
import { AxiosResponse } from 'axios'

export function * checkUserAuthGoogle (action: IUserAuthGoogleAction): Generator<StrictEffect> {
  yield put({
    type: UserTypes.USER_AUTH_GOOGLE_SUCCESS,
    payload: action.payload
  })
}

export function * userAuthLogin (action: IUserAuthLoginAction): Generator<StrictEffect> {
  try {
    const response = yield call(authLogin, action.payload)

    const { data } = response as AxiosResponse<IUserLogin>

    if (!data) throw new Error('Failed to login')

    localStorage.setItem('token', data.token)

    yield put({
      type: UserTypes.USER_AUTH_LOGIN_SUCCESS,
      payload: data
    })
  } catch {
    yield put({
      type: UserTypes.USER_AUTH_LOGIN_FAILURE
    })
  }
}

export function * userAuthLogout (): Generator<StrictEffect> {
  yield put({
    type: UserTypes.USER_AUTH_LOGOUT_SUCCESS
  })
  localStorage.removeItem('state')
}

export default function * userSagas (): Generator<StrictEffect> {
  yield all([
    takeLatest(UserTypes.USER_AUTH_GOOGLE, checkUserAuthGoogle),
    takeLatest(UserTypes.USER_AUTH_LOGIN_REQUEST, userAuthLogin),
    takeLatest(UserTypes.USER_AUTH_LOGOUT_REQUEST, userAuthLogout)
  ])
}
