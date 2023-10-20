import { createStyles, makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) =>
  createStyles({
    paper: {
      margin: theme.spacing(5),
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
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
      width: theme.spacing(12),
      height: theme.spacing(12),
      border: '3px solid white'
    },
    photoButton: {
      position: 'absolute',
      right: 0,
      top: 0,
      background: theme.palette.common.white,
      borderRadius: '50%'
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.primary.main
    }
  })
)
