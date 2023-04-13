import { IUserActions, UserTypes, IUserLoginGoogle } from './types'
import { payloadAuthLogin } from '../../routes/services/auth'

export const checkUserAuthGoogle = (payload: IUserLoginGoogle): IUserActions => ({
  type: UserTypes.USER_AUTH_GOOGLE,
  payload
})

export const userAuthLogin = (payload: payloadAuthLogin): IUserActions => ({
  type: UserTypes.USER_AUTH_LOGIN_REQUEST,
  payload
})

export const userAuthLogout = (): IUserActions => ({
  type: UserTypes.USER_AUTH_LOGOUT_REQUEST
})
