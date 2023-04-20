import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    appBar: {
      backgroundColor: '#20262D'
    },
    icon: {
      maxWidth: '100%',
      height: 'auto',
      display: 'flex'
    },
    menuButton: {
      marginRight: theme.spacing(5),
      padding: 12
    },
    button: {
      backgroundColor: 'transparent'
    }
  })
)
