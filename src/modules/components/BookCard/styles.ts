import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

interface BookCardStylesProps {
  hasMoreThanEightLines: boolean
}

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
      maxHeight: '204px',
      textAlign: 'justify',
      '&:after': {
        content: "''",
        position: (props: BookCardStylesProps) => props.hasMoreThanEightLines ? 'absolute' : 'none',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '48px',
        background: `linear-gradient(rgba(255, 255, 255, 0.001), ${theme.palette.background.paper})`
      }
    },
    seeMoreButton: {
      cursor: 'pointer'
    },
    publicationDate: {
      display: 'flex',
      alignItems: 'center'
    },
    link: {
      textDecoration: 'none',
      color: 'inherit'
    },
    liked: {
      color: theme.palette.error.main
    }
  })
)
