import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: '100%',
      width: '100%',
      padding: 0,
      margin: 0,
      flexGrow: 1,
      display: 'flex',
      height: '100vh'
    },
    bookImage: {
      maxWidth: '300px',
      height: 'auto',
      display: 'flex',
      margin: 'auto',
      borderRadius: 50,
      border: '3px solid white',
      [theme.breakpoints.down('md')]: {
        maxWidth: '50%'
      }
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
