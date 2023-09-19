import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) =>
  createStyles({
    paperAdmin: {
      padding: theme.spacing(2),
      marginTop: 16,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      border: 0,
      [theme.breakpoints.between('xs', 'sm')]: {
        padding: theme.spacing(0)
      }
    },
    paperAdminSub: {
      padding: theme.spacing(2),
      color: 'white',
      marginTop: 16,
      backgroundColor: '#3f51b5',
      border: 0,
      marginBottom: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      [theme.breakpoints.between('xs', 'sm')]: {
        margin: theme.spacing(0),
        flexDirection: 'column'
      }
    },
    gridTitle: {
      display: 'flex',
      justifyContent: 'flex-start',
      marginTop: '1rem'
    }
  })
)
