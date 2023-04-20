import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) =>
  createStyles({
    userPhoto: {
      maxWidth: '96px',
      height: 'auto',
      display: 'flex',
      margin: 'auto',
      borderRadius: 50,
      border: '3px solid white'
    },
    paper: {
      margin: theme.spacing(5),
      padding: theme.spacing(2),
      textAlign: 'center',
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
