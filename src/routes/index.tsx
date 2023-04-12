import React, { Suspense } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import LoadingSimple from '../modules/components/LoadingSimple'

const Login = React.lazy(() => import('../modules/pages/Login'))
const NotFound = React.lazy(() => import('../modules/pages/NotFound'))
const LoadingAnimation = React.lazy(() => import('../modules/components/Loading'))

const AppRoutes = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSimple />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/loading" element={<LoadingAnimation/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default AppRoutes
