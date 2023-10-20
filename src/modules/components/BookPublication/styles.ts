import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) =>
  createStyles({
    userPhoto: {
      width: 50,
      height: 50
    },
    paper: {
      margin: theme.spacing(5),
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
      margin: theme.spacing(2)
    },
    cleanSearchButton: {
      fontFamily: 'system-ui'
    }
  })
)
