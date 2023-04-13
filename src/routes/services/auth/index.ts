import axiosInstance from '../axios'
import { AxiosPromise } from 'axios'

export interface payloadAuthLogin {
  email: string;
  password: string;
}

export interface payloadAuthVerifyEmail {
  token: string;
}

export interface payloadAuthSendEmailVerify {
  email: string;
}

export interface payloadAuthSendEmailResetPassword {
  email: string;
}

export interface payloadAuthResetPassword {
  email: string;
  newPassword: string;
  resetToken: string;
}

const authLogin = (payload: payloadAuthLogin): AxiosPromise => {
  return axiosInstance.post('/auth', payload)
}

const authVerifyEmail = (payload: payloadAuthVerifyEmail): AxiosPromise => {
  return axiosInstance.post('/auth/verify', payload)
}

const authSendEmailVerify = (payload: payloadAuthSendEmailVerify): AxiosPromise => {
  return axiosInstance.post('/auth/send/email-verify', payload)
}

const authSendEmailResetPassword = (payload: payloadAuthSendEmailResetPassword): AxiosPromise => {
  return axiosInstance.post('/auth/send/email-reset-password', payload)
}

const authResetPassword = (payload: payloadAuthResetPassword): AxiosPromise => {
  return axiosInstance.post('/auth/reset-password-token', payload)
}

export { authLogin, authVerifyEmail, authSendEmailVerify, authSendEmailResetPassword, authResetPassword }
