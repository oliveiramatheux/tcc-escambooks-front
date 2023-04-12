import { createStyles, makeStyles } from '@material-ui/core/styles'

export default makeStyles(() =>
  createStyles({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: '100%',
      display: 'flex',
      margin: 'auto',
      backgroundColor: '#007fff',
      height: '100vh'
    },
    image: {
      maxWidth: '100%',
      height: 'auto',
      display: 'flex',
      margin: 'auto',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden'
    }
  })
)
