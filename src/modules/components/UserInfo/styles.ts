import { createStyles, makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) =>
  createStyles({
    paper: {
      margin: theme.spacing(5),
      padding: theme.spacing(2),
      textAlign: 'center',
      color: `${theme.palette.primary.contrastText}  !important`,
      backgroundColor: `${theme.palette.primary.main}  !important`,
      border: 0,
      [theme.breakpoints.between('xs', 'sm')]: {
        marginRight: theme.spacing(0),
        marginBottom: theme.spacing(0),
        marginLeft: theme.spacing(0)
      }
    },
    userPhoto: {
      display: 'flex',
      margin: 'auto',
      width: `${theme.spacing(12)}px !important`,
      height: `${theme.spacing(12)}px !important`,
      border: '3px solid white'
    },
    link: {
      textDecoration: 'none',
      color: 'white'
    },
    divUserSelector: {
      display: 'flex',
      marginTop: theme.spacing(4),
      justifyContent: 'center',
      color: 'white',
      backgroundColor: '#3f51b5',
      border: 0,
      [theme.breakpoints.between('xs', 'sm')]: {
        marginRight: theme.spacing(0),
        marginBottom: theme.spacing(0),
        marginLeft: theme.spacing(0)
      }
    }
  })
)
