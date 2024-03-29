import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
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
    formControl: {
      margin: theme.spacing(1),
      width: '35ch'
    },
    button: {
      margin: theme.spacing(2),
      fontFamily: 'system-ui'
    },
    divButtons: {
      display: 'flex',
      flexDirection: 'column',
      margin: theme.spacing(5),
      fontWeight: 700,
      width: 'max-content',
      [theme.breakpoints.between('xs', 'sm')]: {
        margin: theme.spacing(3)
      },
      [theme.breakpoints.between('md', 'lg')]: {
        flexDirection: 'row'
      }
    },
    errorHelperText: {
      color: '#f50057 !important'
    },
    link: {
      margin: theme.spacing(1),
      width: '35ch',
      display: 'flex',
      justifyContent: 'center',
      cursor: 'pointer'
    }
  })
)
