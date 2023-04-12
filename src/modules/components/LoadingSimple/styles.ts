import { createStyles, makeStyles } from '@material-ui/core/styles'

export default makeStyles(() =>
  createStyles({
    container: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: '100%'
    }
  })
)
