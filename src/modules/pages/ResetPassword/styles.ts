import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) =>
  createStyles({
    container: {
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
      height: '100vh'
    },
    gridResetPassword: {
      borderRadius: '10px',
      border: 0,
      marginTop: '7.5%',
      marginBottom: '7.5%',
      backgroundColor: theme.palette.common.white,
      padding: '30px',
      maxWidth: '100%',
      width: '100%',
      height: '-webkit-fill-available',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      border: 0,
      [theme.breakpoints.between('xs', 'sm')]: {
        padding: theme.spacing(0)
      }
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    errorHelperText: {
      color: '#f50057 !important'
    },
    successHelperText: {
      color: '#66bb6a'
    },
    button: {
      margin: theme.spacing(2)
    },
    animatedBook: {
      maxWidth: '30%',
      height: 'auto',
      display: 'flex',
      margin: 'auto',
      [theme.breakpoints.down('md')]: {
        maxWidth: '50%'
      }
    },
    divButtons: {
      display: 'flex',
      flexDirection: 'column',
      margin: theme.spacing(5),
      fontWeight: 700,
      width: 'max-content',
      [theme.breakpoints.between('xs', 'sm')]: {
        margin: theme.spacing(3)
      }
    },
    formControl: {
      margin: theme.spacing(1),
      width: '35ch'
    }
  })
)
