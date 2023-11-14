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
    profileActionsContainer: {
      position: 'absolute',
      right: 0,
      top: 0
    },
    photoButton: {
      background: theme.palette.common.white,
      display: 'block',
      borderRadius: '50%',
      width: theme.spacing(4),
      height: theme.spacing(4)
    },
    editButton: {
      '&:hover': {
        backgroundColor: theme.palette.common.white
      },
      backgroundColor: theme.palette.common.white,
      color: theme.palette.primary.main,
      borderRadius: '50%',
      width: theme.spacing(4),
      height: theme.spacing(4),
      marginTop: theme.spacing(1 / 2)
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.primary.main
    }
  })
)
