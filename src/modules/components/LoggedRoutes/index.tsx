import { ThemeProvider } from '@material-ui/core'
import { useEffect } from 'react'
import { useTheme } from '../../../theme'
import { Outlet, useNavigate } from 'react-router-dom'
import { ApplicationState } from '../../../store/rootReducer'
import { useSelector } from 'react-redux'
import { handleEventUserInfos } from '../../../utils/analytics/analytics'

const LoggedRoutes = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { user } = useSelector(
    (state: ApplicationState) => state
  )

  handleEventUserInfos(user)

  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate('/login')
    }
  }, [navigate, user])

  return (
    <ThemeProvider theme={theme}>
      <div style={{
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh'
      }}>
        <Outlet />
      </div>
    </ThemeProvider>
  )
}

export default LoggedRoutes
