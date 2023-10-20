import { createStyles, makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) =>
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
      marginTop: '7.5% !important',
      marginBottom: '7.5% !important',
      backgroundColor: theme.palette.common.white,
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
        marginBottom: '0 !important',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        height: 'auto'
      },
      [theme.breakpoints.between('md', 'lg')]: {
        marginTop: '1.5% !important',
        marginBottom: '1.5% !important'
      }
    },
    gridLogin: {
      borderRadius: '10px',
      border: 0,
      marginTop: '7.5% !important',
      marginBottom: '7.5% !important',
      backgroundColor: theme.palette.common.white,
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
        marginTop: '0 !important',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        height: 'auto'
      },
      [theme.breakpoints.between('md', 'lg')]: {
        marginTop: '1.5% !important',
        marginBottom: '1.5% !important'
      }
    }
  })
)
