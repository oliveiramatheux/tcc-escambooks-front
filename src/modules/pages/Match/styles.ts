import { createStyles, makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) =>
  createStyles({
    userPhoto: {
      display: 'flex',
      margin: 'auto',
      width: theme.spacing(12),
      height: theme.spacing(12),
      border: `3px solid ${theme.palette.text.primary}`
    },
    gridContainer: {
      textAlign: 'center',
      overflow: 'auto',
      padding: '40px',
      height: '100%'
    },
    bookImage: {
      height: '600px',
      maxWidth: '600px',
      objectFit: 'contain'
    }
  })
)
