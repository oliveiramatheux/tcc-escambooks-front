import React, { useState, createRef, useEffect } from 'react'
import {
  AppBar, Toolbar, IconButton,
  InputBase, Badge, MenuItem, Menu, Fab
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import SearchIcon from '@material-ui/icons/Search'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import MoreIcon from '@material-ui/icons/MoreVert'
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded'
import CreateRoundedIcon from '@material-ui/icons/CreateRounded'
import useStyles from './styles'
import { ApplicationState } from '../../../store/rootReducer'
import { Link, useNavigate } from 'react-router-dom'
import { userAuthLogout } from '../../../store/users/actions'
import { auth } from '../../../config/firebase'
import { useDispatch, useSelector } from 'react-redux'
import icon from '../../../images/icons/icon.png'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import BackToTop from '../BackToTop'
import TermsAndConditions from '../TermsAndConditions'
import Tooltip from '@mui/material/Tooltip'
import { getUserLikes, Like, updateLike } from '../../../routes/services'

const HeaderMenu = (): JSX.Element => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector(
    (state: ApplicationState) => state
  )

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null)
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null)
  const [openModalScroll, setOpenModalScroll] = useState<boolean>(false)
  const [notifications, setNotifications] = useState<Like[]>([])
  const [notificationsNotVisualized, setNotificationsNotVisualized] = useState<number>(0)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  const isNotificationMenuOpen = Boolean(notificationAnchorEl)

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const handleCloseModalScroll = () => {
    setOpenModalScroll(false)
  }

  const logOut = async () => {
    if (user.isGoogleLogin) await auth.signOut()
    dispatch(userAuthLogout())
    navigate('/login')
  }

  const handleClickLogOut = () => {
    handleMenuClose()
    logOut()
  }

  const handleOpenTermsAndConditions = () => {
    handleMenuClose()
    setOpenModalScroll(true)
  }

  const handleClickProfile = () => {
    navigate('/profile')
  }

  const handleClickIcon = () => {
    navigate('/home')
  }

  const inputRef = createRef()

  const listNotifications = async () => {
    const notifications = await getUserLikes(user.id)

    if (!notifications) return

    setNotifications(notifications.items)

    setNotificationsNotVisualized(notifications.totalItemsNotVisualized)
  }

  const updateVisualizedNotifications = async () => {
    notifications.forEach(async notification => {
      if (!notification.isVisualized) {
        await updateLike(notification.id, {
          isVisualized: true
        })
      }
    })
  }

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget)
    updateVisualizedNotifications()
  }

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null)
    listNotifications()
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
    handleNotificationMenuClose()
  }

  const menuNotificationId = 'notification-menu'

  const renderNotificationMenu = () => {
    return (<Menu
        anchorEl={notificationAnchorEl}
        ref={inputRef}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuNotificationId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isNotificationMenuOpen}
        onClose={handleNotificationMenuClose}
      >
        {notifications.length
          ? notifications.map((notification) => {
            return (
              <Link to={`/profile/${notification.userLikedId}`} key={notification.id} className={classes.link}>
                <MenuItem>O usuário {notification.userLikedName} deu um like no seu livro {notification.bookTitle}</MenuItem>
              </Link>
            )
          })
          : (<MenuItem onClick={handleNotificationMenuClose}>Nenhuma notificação</MenuItem>)}

      </Menu>)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      ref={inputRef}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleClickProfile}>Perfil</MenuItem>
      <MenuItem onClick={handleMenuClose}>Configurações</MenuItem>
      <MenuItem onClick={handleOpenTermsAndConditions}>Termos e condições</MenuItem>
      <MenuItem onClick={handleClickLogOut}>Sair</MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      ref={inputRef}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="exams" color="inherit">
          <MenuBookRoundedIcon />
        </IconButton>
        <p>Vestibulares</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="authors" color="inherit">
          <CreateRoundedIcon />
        </IconButton>
        <p>Autores</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="messages" color="inherit">
          <Badge badgeContent={0} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Mensagens</p>
      </MenuItem>
      <MenuItem onClick={handleNotificationMenuOpen}>
        <IconButton aria-label="notifications" color="inherit" aria-controls={menuNotificationId}
          aria-haspopup="true">
          <Badge badgeContent={notificationsNotVisualized} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notificações</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Perfil</p>
      </MenuItem>
    </Menu>
  )

  useEffect(() => {
    if (user) listNotifications()
  }, [user])

  return (
    <>
      <div className={classes.grow}>
        <AppBar position="static" id="back-to-top-anchor">
          <Toolbar>
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
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Nome do livro..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Tooltip title="Vestibulares">
                <IconButton aria-label="exams" color="inherit">
                  <MenuBookRoundedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Autores">
                <IconButton aria-label="authors" color="inherit">
                  <CreateRoundedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Mensagens">
                <IconButton aria-label="show new messages" color="inherit">
                  <Badge badgeContent={0} color="secondary">
                    <MailIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Notificações">
                <IconButton aria-label="show new notifications" color="inherit"
                  aria-controls={menuNotificationId}
                  aria-haspopup="true"
                  onClick={handleNotificationMenuOpen}>
                  <Badge badgeContent={notificationsNotVisualized} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Conta">
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        {renderNotificationMenu()}
      </div>
      <BackToTop>
        <Fab color="primary" size="medium" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </BackToTop>
      <TermsAndConditions
        open={openModalScroll}
        closeAction={handleCloseModalScroll}
      />
    </>
  )
}

export default HeaderMenu
