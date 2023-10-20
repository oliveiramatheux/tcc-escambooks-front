import { makeStyles, createStyles, alpha } from '@material-ui/core'

export default makeStyles(theme => createStyles({
  root: {
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      backgroundColor: theme.palette.background.paper,
      color:
        theme.palette.text.primary,
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0'
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5)
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.background.paper,
            theme.palette.action.selectedOpacity
          )
        }
      }
    }
  },
  button: {
    color: theme.palette.type === 'light' ? theme.palette.action.active : 'inherit !important'
  }
}))
