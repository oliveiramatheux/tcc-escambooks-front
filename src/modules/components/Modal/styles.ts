import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) =>
  createStyles({
    modalTitle: {
      margin: 0,
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.6,
      letterSpacing: '0.0075em',
      padding: '16px 24px',
      flex: '0 0 auto',
      color: theme.palette.text.primary
    },
    dialog: {
      width: '-webkit-fill-available',
      '& .MuiDialog-paper': {
        backgroundColor: theme.palette.background.paper,
        color: `${theme.palette.text.primary} !important`
      },
      flex: '0 0 auto'
    },
    description: {
      color: `${theme.palette.text.primary} !important`
    }
  })
)
