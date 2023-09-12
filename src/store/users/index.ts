import { UserTypes, IUserState, IUserActions } from './types'

const initialState: IUserState = {
  id: '',
  email: '',
  name: '',
  imageUrl: null,
  loading: false,
  failure: false,
  isAuthenticated: false,
  isGoogleLogin: false
}

export default function userReducer (
  state = initialState,
  action: IUserActions
): IUserState {
  switch (action.type) {
    case UserTypes.GET_USER:
      return {
        ...state,
        loading: true
      }

    case UserTypes.GET_USER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false
      }

    case UserTypes.GET_USER_FAILURE:
      return {
        ...state,
        loading: false,
        failure: true
      }

    case UserTypes.USER_AUTH_GOOGLE:
      return {
        ...initialState,
        loading: true
      }

    case UserTypes.USER_AUTH_GOOGLE_SUCCESS:
      return {
        ...state,
        email: action.payload.email,
        name: action.payload.name,
        imageUrl: action.payload.photoURL,
        isGoogleLogin: true,
        isAuthenticated: true,
        loading: false
      }

    case UserTypes.USER_AUTH_LOGIN_REQUEST:
      return {
        ...initialState,
        loading: true
      }

    case UserTypes.USER_AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        id: action.payload._id,
        name: action.payload.name,
        email: action.payload.email,
        imageUrl: action.payload.imageUrl,
        isAdmin: !!action.payload.adminToken,
        isAuthenticated: true,
        loading: false
      }

    case UserTypes.USER_AUTH_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        failure: true
      }

    case UserTypes.USER_AUTH_LOGOUT_REQUEST:
      return {
        ...state,
        loading: true
      }

    case UserTypes.USER_AUTH_LOGOUT_SUCCESS:
      return {
        ...initialState
      }

    default:
      return state
  }
}
