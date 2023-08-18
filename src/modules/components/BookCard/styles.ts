import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) =>
  createStyles({
    userPhoto: {
      width: 50,
      height: 50
    },
    card: {
      marginTop: theme.spacing(2),
      display: 'flex',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column'
      }
    },
    cardContent: {
      padding: '8px 16px'
    },
    cardItem: {
      flex: '1 0 50%'
    },
    cardMedia: {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
      display: 'block',
      [theme.breakpoints.down('xs')]: {
        display: 'none'
      }
    },
    cardMediaMobile: {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
      display: 'none',
      [theme.breakpoints.down('xs')]: {
        display: 'block'
      }
    },
    description: {
      position: 'relative',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      lineClamp: 8,
      boxOrient: 'vertical',
      textAlign: 'justify'
    },
    seeMoreButton: {
      marginTop: theme.spacing(1 / 2),
      paddingLeft: 0,
      textTransform: 'none'
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
