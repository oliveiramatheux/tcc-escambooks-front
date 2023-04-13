import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      border: 0
    },
    about: {
      textAlign: 'justify',
      fontWeight: 700,
      lineHeight: '25px',
      fontSize: 14,
      fontFamily: 'Arial',
      marginTop: 0
    },
    logo: {
      maxWidth: '100%',
      height: 'auto',
      display: 'flex',
      margin: 'auto'
    },
    banner: {
      maxWidth: '65%',
      height: 'auto',
      display: 'flex',
      margin: 'auto',
      [theme.breakpoints.between('md', 'lg')]: {
        display: 'none'
      }
    }
  })
)
