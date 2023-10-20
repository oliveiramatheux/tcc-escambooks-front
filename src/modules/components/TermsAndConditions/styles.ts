import { createStyles, makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) =>
  createStyles({
    divContentModalScroll: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'justify'
    },
    textModalScroll: {
      marginTop: 0,
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
      color: theme.palette.text.secondary,
      textAlign: 'justify'
    }
  })
)
