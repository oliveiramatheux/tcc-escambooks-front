import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) =>
  createStyles({
    inputRoot: {
      color: 'inherit'
    },
    inputInput: {
      color: 'inherit',
      height: 50,
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '30ch'
      }
    }
  })
)
