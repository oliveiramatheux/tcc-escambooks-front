import { createStyles, makeStyles, createTheme } from '@material-ui/core/styles'

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

const theme = createTheme({
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
})

export default makeStyles(() =>
  createStyles({
    root: {
      maxWidth: '100%',
      width: '100%',
      padding: 0,
      margin: 0,
      background: 'linear-gradient(to right, #0062E6, #33AEFF)',
      '& .MuiContainer-maxWidthLg': {
        maxWidth: 0
      },
      flexGrow: 1,
      display: 'flex',
      height: '100vh',
      [theme.breakpoints.between('xs', 'sm')]: {
        height: '100%'
      }
    },
    gridAbout: {
      borderRadius: '10px',
      border: 0,
      marginTop: '7.5%',
      marginBottom: '7.5%',
      backgroundColor: 'white',
      padding: '30px',
      maxWidth: '100%',
      width: '100%',
      height: '-webkit-fill-available',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      [theme.breakpoints.between('xs', 'sm')]: {
        marginBottom: '0',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        height: 'auto'
      },
      [theme.breakpoints.between('md', 'lg')]: {
        marginTop: '1.5%',
        marginBottom: '1.5%'
      }
    },
    gridLogin: {
      borderRadius: '10px',
      border: 0,
      marginTop: '7.5%',
      marginBottom: '7.5%',
      backgroundColor: 'white',
      padding: '30px',
      maxWidth: '100%',
      width: '100%',
      height: '-webkit-fill-available',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      [theme.breakpoints.between('xs', 'sm')]: {
        marginTop: '0',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        height: 'auto'
      },
      [theme.breakpoints.between('md', 'lg')]: {
        marginTop: '1.5%',
        marginBottom: '1.5%'
      }
    }
  })
)
