import { createTheme, useMediaQuery } from '@material-ui/core'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { ApplicationState } from './store/rootReducer'

declare module '@material-ui/core/styles/createBreakpoints' {
  interface BreakpointOverrides {
    xs: true
    sm: true
    md: true
    lg: true
    xl: true
    notWeb: true
  }
}

export const useTheme = () => {
  const { darkMode } = useSelector(
    (state: ApplicationState) => state.preferences
  )
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type: darkMode ? 'dark' : 'light',
          primary: {
            main: '#3f51b5'
          },
          secondary: {
            main: '#007fff'
          },
          error: {
            main: '#f50057'
          },
          success: {
            main: '#66bb6a'
          },
          contrastThreshold: 3,
          tonalOffset: 0.2
        },
        overrides: {
          MuiDialog: {
            root: {
              backgroundColor: '#000'
            },
            paper: {
              backgroundColor: '#000'
            }
          }
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
            notWeb: 960
          }
        }
      }),
    [darkMode]
  )

  return theme
}
