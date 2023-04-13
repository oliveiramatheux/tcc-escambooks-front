import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      border: 0
    },
    containerBottomNavigation: {
      maxWidth: '100%',
      height: 'auto',
      display: 'flex',
      margin: 'auto'
    }
  })
)
