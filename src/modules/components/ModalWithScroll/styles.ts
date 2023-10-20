import { createStyles, makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) =>
  createStyles({
    modalTitle: {
      margin: 0,
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.6,
      letterSpacing: '0.0075em',
      padding: '16px 24px',
      flex: '0 0 auto'
    },
    rightsFooter: {
      marginTop: 0,
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontWeight: 400,
      fontSize: '0.8rem',
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
      color: theme.palette.text.secondary,
      textAlign: 'left',
      justifyContent: 'flex-start',
      flex: '0 0 auto'
    },
    dialog: {
      '& .MuiDialog-paper': {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary
      }
    }
  })
)
