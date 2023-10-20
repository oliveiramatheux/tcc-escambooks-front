import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) =>
  createStyles({
    paperAdmin: {
      textAlign: 'center',
      margin: theme.spacing(5),
      border: 0,
      [theme.breakpoints.between('xs', 'sm')]: {
        padding: theme.spacing(0),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
      }
    },
    paperAdminSub: {
      padding: theme.spacing(2),
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      border: 0,
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
