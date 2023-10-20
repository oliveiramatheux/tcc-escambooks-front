import { createStyles, makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme =>
  createStyles({
    divContentModalScroll: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'justify'
    },
    textModalScroll: {
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontWeight: 700,
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
      textAlign: 'justify',
      textDecoration: 'underline',
      cursor: 'pointer',
      '&:hover': {
        color: theme.palette.primary.main
      }
    }
  })
)
