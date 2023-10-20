import React, { Suspense } from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import LoadingSimple from '../modules/components/LoadingSimple'
import LoggedRoutes from '../modules/components/LoggedRoutes'

const Login = React.lazy(async () => await import('../modules/pages/Login'))
const NotFound = React.lazy(async () => await import('../modules/pages/NotFound'))
const LoadingAnimation = React.lazy(async () => await import('../modules/components/Loading'))
const CheckEmail = React.lazy(async () => await import('../modules/pages/CheckEmail'))
const ForgotPassword = React.lazy(async () => await import('../modules/pages/ForgotPassword'))
const ResetPassword = React.lazy(async () => await import('../modules/pages/ResetPassword'))
const Home = React.lazy(async () => await import('../modules/pages/Home'))
const UserProfile = React.lazy(async () => await import('../modules/pages/UserProfile'))
const Admin = React.lazy(async () => await import('../modules/pages/Admin'))

const AppRoutes = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSimple />}>
        <Routes>
          <Route path="/" element={<LoggedRoutes />} >
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile/:id?" element={<UserProfile />} />
            <Route path="/admin" element={<Admin/>}/>
          </Route>
          <Route path="/login" element={<Login/>} />
          <Route path="/verify-email" element={<CheckEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/loading" element={<LoadingAnimation/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default AppRoutes
