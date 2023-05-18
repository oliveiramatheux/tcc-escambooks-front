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
      flex: '0 0 auto'
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    formControl: {
      margin: theme.spacing(2.5),
      width: '35ch'
    },
    formControlWithoutWidth: {
      margin: theme.spacing(2.5),
      width: '35ch'
    },
    button: {
      margin: theme.spacing(2)
    },
    divButtons: {
      display: 'flex'
    },
    errorHelperText: {
      color: '#f50057'
    },
    dialog: {
      width: '-webkit-fill-available',
      padding: theme.spacing(2)
    }
  })
)
