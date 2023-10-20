import { makeStyles, Theme, createStyles, alpha } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) =>
  createStyles({
    profileImage: {
      width: 40,
      height: 40
    },
    divRedirect: {
      width: '100%',
      height: '100%',
      backgroundSize: 'cover'
    },
    loadingIcon: {
      color: 'white'
    },
    usernameSpan: {
      paddingLeft: 10
    },
    userSearchBackground: {
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
      }
    },
    darkThemeStyles: {
      backgroundColor: '#424242',
      color: 'white'
    },
    lightThemeStyles: {
      backgroundColor: 'white',
      color: 'black',
      size: '100%'
    }
  })
)
