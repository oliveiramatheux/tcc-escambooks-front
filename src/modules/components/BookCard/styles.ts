import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) =>
  createStyles({
    userPhoto: {
      width: 50,
      height: 50
    },
    card: {
      marginTop: theme.spacing(2)
    },
    publicationDate: {
      display: 'flex',
      alignItems: 'center'
    },
    link: {
      textDecoration: 'none'
    },
    liked: {
      color: theme.palette.error.main
    }
  })
)
