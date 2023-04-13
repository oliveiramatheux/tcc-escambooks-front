export enum UserTypes {
  GET_USER = '@user/GET_USER',
  GET_USER_SUCCESS = '@user/GET_USER_SUCCESS',
  GET_USER_FAILURE = '@user/GET_USER_FAILURE',
  USER_AUTH_GOOGLE = '@user/USER_AUTH_GOOGLE',
  USER_AUTH_GOOGLE_SUCCESS = '@user/USER_AUTH_GOOGLE_SUCCESS',
  USER_AUTH_LOGIN_REQUEST = '@user/USER_AUTH_LOGIN_REQUEST',
  USER_AUTH_LOGIN_SUCCESS = '@user/USER_AUTH_LOGIN_SUCCESS',
  USER_AUTH_LOGIN_FAILURE = '@user/USER_AUTH_LOGIN_FAILURE',
  USER_AUTH_LOGOUT_REQUEST = '@user/USER_AUTH_LOGOUT_REQUEST',
  USER_AUTH_LOGOUT_SUCCESS = '@user/USER_AUTH_LOGOUT_SUCCESS',
}

export interface IUserState {
  id: string
  email: string | null
  name?: string | null
  photoURL?: string | null
  loading: boolean
  failure: boolean
  isAuthenticated: boolean
  isGoogleLogin: boolean
}

export interface IUserLoginGoogle {
  email: string | null
  name?: string | null
  photoURL?: string | null
}

export interface IUserLogin {
  _id: string
  name: string
  email: string
  token: string
}

export interface IGetUserAction {
  type: typeof UserTypes.GET_USER
}

interface IGetUserSuccessAction {
  type: typeof UserTypes.GET_USER_SUCCESS
  payload: IUserState
}

interface IGetUserFailureAction {
  type: typeof UserTypes.GET_USER_FAILURE
}

export interface IUserAuthGoogleAction {
  type: typeof UserTypes.USER_AUTH_GOOGLE
  payload: IUserLoginGoogle
}

interface IUserAuthGoogleSuccessAction {
  type: typeof UserTypes.USER_AUTH_GOOGLE_SUCCESS
  payload: IUserLoginGoogle
}

export interface IUserAuthLoginAction {
  type: typeof UserTypes.USER_AUTH_LOGIN_REQUEST
  payload: { email: string, password: string }
}

interface IUserAuthLoginSuccessAction {
  type: typeof UserTypes.USER_AUTH_LOGIN_SUCCESS
  payload: IUserLogin
}

interface IUserAuthLoginFailureAction {
  type: typeof UserTypes.USER_AUTH_LOGIN_FAILURE
}

export interface IUserAuthLogoutAction {
  type: typeof UserTypes.USER_AUTH_LOGOUT_REQUEST
}

interface IUserAuthLogoutSuccessAction {
  type: typeof UserTypes.USER_AUTH_LOGOUT_SUCCESS
}

export type IUserActions =
    | IGetUserAction
    | IGetUserSuccessAction
    | IGetUserFailureAction
    | IUserAuthGoogleAction
    | IUserAuthGoogleSuccessAction
    | IUserAuthLoginAction
    | IUserAuthLoginSuccessAction
    | IUserAuthLoginFailureAction
    | IUserAuthLogoutAction
    | IUserAuthLogoutSuccessAction
