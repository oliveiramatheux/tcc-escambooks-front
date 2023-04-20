import React from 'react'
import useStyles from './styles'
import { Fab } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import icon from '../../../images/icons/icon.png'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import BackToTop from '../BackToTop'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

const HeaderMenu = (): JSX.Element => {
  const classes = useStyles()
  const navigate = useNavigate()

  const handleClickLogin = () => {
    navigate('/login')
  }

  const handleClickIcon = () => {
    navigate('/home')
  }

  return (
    <>
      <div className={classes.grow}>
        <AppBar className={classes.appBar} position="static" id="back-to-top-anchor">
          <Toolbar className={classes.appBar}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              role={'presentation'}
              onClick={handleClickIcon}
            >
              <img src={icon} alt="Escambooks icon" className={classes.icon} />
            </IconButton>
            <Typography variant="h6" noWrap>
              {'Escambooks'}
            </Typography>
            <div className={classes.grow} />
            <Button color="inherit" className={classes.button} onClick={handleClickLogin}>Entrar</Button>
          </Toolbar>
        </AppBar>
      </div>
      <BackToTop>
        <Fab color="primary" size="medium" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </BackToTop>
    </>
  )
}

export default HeaderMenu
