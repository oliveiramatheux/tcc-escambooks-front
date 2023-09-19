import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { blueGrey } from '@mui/material/colors'

export default makeStyles((theme: Theme) =>
  createStyles({
    userPhoto: {
      width: 50,
      height: 50
    },
    paper: {
      margin: theme.spacing(5),
      color: theme.palette.background.paper,
      border: 0,
      [theme.breakpoints.between('xs', 'sm')]: {
        margin: theme.spacing(0),
        padding: theme.spacing(2)
      }
    },
    card: {
      marginTop: theme.spacing(2)
    },
    paperPublish: {
      padding: theme.spacing(2),
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      border: 0,
      marginBottom: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      [theme.breakpoints.between('xs', 'sm')]: {
        flexDirection: 'column'
      }
    },
    publicationDate: {
      display: 'flex',
      alignItems: 'center'
    },
    button: {
      margin: theme.spacing(2),
      color: theme.palette.getContrastText(blueGrey[500]),
      backgroundColor: blueGrey[500],
      '&:hover': {
        backgroundColor: blueGrey[700]
      }
    },
    cleanSearchButton: {
      fontFamily: 'system-ui'
    }
  })
)
