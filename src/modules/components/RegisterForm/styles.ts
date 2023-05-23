import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: '0 16px',
      textAlign: 'center',
      color: theme.palette.text.secondary,
      border: 0,
      [theme.breakpoints.between('xs', 'sm')]: {
        padding: theme.spacing(0)
      },
      overflowY: 'auto',
      '&::-webkit-scrollbar': {
        width: '6px'
      },
      '&::-webkit-scrollbar-track': {
        background: '#f1f1f1'
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#3f51b5',
        borderRadius: '6px'
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: '#007fff'
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
    errorHelperText: {
      color: '#f50057 !important'
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
        margin: 0
      }
    },
    link: {
      cursor: 'pointer'
    }
  })
)
