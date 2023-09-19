import React, { useState, createRef, useEffect, useCallback } from 'react'
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
import { auth, deleteFile, getStorageRef } from '../../../config/firebase'
import { useDispatch, useSelector } from 'react-redux'
import icon from '../../../images/icons/icon.png'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import BackToTop from '../BackToTop'
import TermsAndConditions from '../TermsAndConditions'
import Tooltip from '@mui/material/Tooltip'
import { deleteUserById, getUserLikes, Like, updateLike } from '../../../routes/services'
import UserSettings from '../UserSettings'
import Modal from '../Modal'
import { socket } from 'config/socket'

interface HeaderMenuProps {
  hideSearchBar?: boolean
}

const HeaderMenu = ({ hideSearchBar }: HeaderMenuProps): JSX.Element => {
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
  const [searchBookTerm, setSearchBookTerm] = useState('')
  const [openUserSettings, setOpenUserSettings] = useState(false)
  const [openModalDeleteUser, setOpenModalDeleteUser] = useState(false)
  const [deleteUserLoading, setDeleteUserLoading] = useState(false)

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

  const logOut = useCallback(async () => {
    if (user.isGoogleLogin) await auth.signOut()
    dispatch(userAuthLogout())
    navigate('/login')
  }, [dispatch, navigate, user.isGoogleLogin])

  const listNotifications = useCallback(async () => {
    const notifications = await getUserLikes(user.id)

    if (!notifications) return

    setNotifications(notifications.items)

    setNotificationsNotVisualized(notifications.totalItemsNotVisualized)
  }, [user.id])

  const handleNotificationMenuClose = useCallback(() => {
    setNotificationAnchorEl(null)
  }, [])

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null)
    handleMobileMenuClose()
    handleNotificationMenuClose()
  }, [handleNotificationMenuClose])

  const handleClickLogOut = useCallback(() => {
    handleMenuClose()
    logOut()
  }, [handleMenuClose, logOut])

  const handleOpenTermsAndConditions = () => {
    handleMenuClose()
    setOpenModalScroll(true)
  }

  const handleOpenUserSettings = () => {
    handleMenuClose()
    setOpenUserSettings(true)
  }

  const handleClickProfile = () => {
    navigate('/profile')
  }

  const handleClickIcon = () => {
    navigate('/home')
  }

  const handleClickAdmin = () => {
    navigate('/admin')
  }

  const inputRef = createRef()

  const updateVisualizedNotifications = async () => {
    notifications.forEach(notification => {
      if (!notification.isVisualized) {
        updateLike(notification.id, {
          isVisualized: true
        })
      }
    })

    const notificationsMapped = notifications.map(notification => ({ ...notification, isVisualized: true }))
    setNotifications(notificationsMapped)
    setNotificationsNotVisualized(0)
  }

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget)
    updateVisualizedNotifications()
  }

  const handleCloseModalDeleteUser = () => {
    setOpenModalDeleteUser(false)
  }

  const onClickDeleteUserAction = useCallback(async () => {
    try {
      setDeleteUserLoading(true)
      const response = await deleteUserById(user.id)

      if (response?.imageName) {
        const storageUserRef = getStorageRef(`images/user/${response.email}/avatar/${response.imageName}`)
        await deleteFile(storageUserRef)
      }

      if (response?.userBooksImages?.length) {
        response.userBooksImages.forEach(async userBookImageInfo => {
          const storageUserRef = getStorageRef(`images/user/${response.email}/books/${userBookImageInfo.bookId}/${userBookImageInfo.bookImageName}`)
          await deleteFile(storageUserRef)
        })
      }

      setDeleteUserLoading(false)
      localStorage.removeItem('email')
      handleClickLogOut()
    } catch {
      setDeleteUserLoading(false)
    }
  }, [handleClickLogOut, user])

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
      <MenuItem onClick={handleOpenUserSettings}>Configurações</MenuItem>
      <MenuItem onClick={handleOpenTermsAndConditions}>Termos e condições</MenuItem>
      {user.isAdmin && <MenuItem onClick={handleClickAdmin}>Área de Administrador</MenuItem>}
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

  const onChangeInputSearchBook = useCallback((event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { value } = event.target
    setSearchBookTerm(value)
  }, [])

  const onSubmitSearchBook = useCallback((event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.key.toLowerCase() !== 'enter' || !searchBookTerm) return
    navigate('/home', { state: { searchBookTerm } })
    setSearchBookTerm('')
  }, [navigate, searchBookTerm])

  const updateLikeReceived = useCallback((like: Like) => {
    setNotifications(state => [...state, like])
    if (!like.isVisualized) {
      setNotificationsNotVisualized(state => state + 1)
    }
  }, [])

  const updateLikeDeleted = useCallback((like: Like) => {
    setNotifications(state => state.filter(stateLike => stateLike.id !== like.id))
    if (!like.isVisualized) {
      setNotificationsNotVisualized(state => state - 1)
    }
  }, [])

  useEffect(() => {
    if (user) listNotifications()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    socket.connect()

    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!user.id) return

    const eventLikeReceived = `like-received-${user.id}`
    const eventLikeDeleted = `like-deleted-${user.id}`

    socket.on(eventLikeReceived, updateLikeReceived)
    socket.on(eventLikeDeleted, updateLikeDeleted)

    return () => {
      socket.off(eventLikeReceived, updateLikeReceived)
      socket.off(eventLikeDeleted, updateLikeDeleted)
    }
  }, [updateLikeDeleted, updateLikeReceived, user.id])

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
            {!hideSearchBar && (<div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Título do livro..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                value={searchBookTerm}
                onChange={(event) => { onChangeInputSearchBook(event) }}
                onKeyDown={(event) => { onSubmitSearchBook(event) }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>)}
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
      {openModalScroll && (<TermsAndConditions
        open={openModalScroll}
        closeAction={handleCloseModalScroll}
      />)}
      {openUserSettings && (<UserSettings
        open={openUserSettings}
        deleteUserAction={() => { setOpenModalDeleteUser(true) }}
        closeAction={() => { setOpenUserSettings(false) }}
      />)}
      {openModalDeleteUser && (<Modal
        open={openModalDeleteUser}
        closeAction={handleCloseModalDeleteUser}
        title={'Exclusão de conta'}
        description={'Tem certeza que deseja excluir sua conta? Esta ação é irreversível e irá excluir todas as suas publicações, curtidas e imagens.'}
        confirmAction={onClickDeleteUserAction}
        loading={deleteUserLoading}
      />)}
    </>
  )
}

export default HeaderMenu
