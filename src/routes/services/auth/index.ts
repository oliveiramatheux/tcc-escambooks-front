import axiosInstance from '../axios'
import { AxiosPromise } from 'axios'

export interface payloadAuthLogin {
  email: string
  password: string
}

export interface payloadAuthVerifyEmail {
  token: string
}

export interface payloadAuthSendEmailVerify {
  email: string
}

export interface payloadAuthSendEmailResetPassword {
  email: string
}

export interface payloadAuthResetPassword {
  email: string
  newPassword: string
  resetToken: string
}

const authLogin = async (payload: payloadAuthLogin): AxiosPromise => {
  return await axiosInstance.post('/auth', payload)
}

const authVerifyEmail = async (payload: payloadAuthVerifyEmail): AxiosPromise => {
  return await axiosInstance.post('/auth/verify', payload)
}

const authSendEmailVerify = async (payload: payloadAuthSendEmailVerify): AxiosPromise => {
  return await axiosInstance.post('/auth/send/email-verify', payload)
}

const authSendEmailResetPassword = async (payload: payloadAuthSendEmailResetPassword): AxiosPromise => {
  return await axiosInstance.post('/auth/send/email-reset-password', payload)
}

const authResetPassword = async (payload: payloadAuthResetPassword): AxiosPromise => {
  return await axiosInstance.post('/auth/reset-password-token', payload)
}

export { authLogin, authVerifyEmail, authSendEmailVerify, authSendEmailResetPassword, authResetPassword }
