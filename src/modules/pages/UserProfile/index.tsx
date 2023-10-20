import { Avatar, Box, CircularProgress, Grid, IconButton, Paper, Tab, Tabs, Typography } from '@material-ui/core'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserById, User, updateUserById } from '../../../routes/services/user'
import { ApplicationState } from '../../../store/rootReducer'
import HeaderMenu from '../../components/HeaderMenu'
import PageDecorator from '../../components/PageDecorator'
import userDefault from '../../../images/user-default.png'
import useStyles from './styles'
import { calculateAge } from '../../../utils/helpers'
import { Book, getAllBooksByUserId, getLikedBooks as getLikedBooksRequest } from '../../../routes/services/books'
import BookCard from '../../components/BookCard'
import LoadingSimple from '../../components/LoadingSimple'
import { deleteFile, getDownloadURL, getStorageRef, uploadBytes } from '../../../config/firebase'
import { PhotoCamera } from '@material-ui/icons'
import { styled } from '@mui/material/styles'
import { TabMenu } from 'modules/components'

const Input = styled('input')({
  display: 'none'
})

const UserProfile = () => {
  const { id } = useParams()
  const classes = useStyles()
  const navigate = useNavigate()
  const [value, setValue] = useState(0)
  const [user, setUser] = useState<User>()
  const [userBooks, setUserBooks] = useState<Book[]>([])
  const [likedBooks, setLikedBooks] = useState<Book[]>([])
  const [loadingUser, setLoadingUser] = useState(true)
  const [loadingUserBooks, setLoadingUserBooks] = useState(true)
  const [loadingLikedBooks, setLoadingLikedBooks] = useState(true)
  const [uploadPhotoLoading, setUploadPhotoLoading] = useState(false)

  const { user: userState } = useSelector(
    (state: ApplicationState) => state
  )

  const isProfileFromLoggedUser = !id || id === userState.id

  const userFirstName = user?.name.split(' ')[0]

  const booksTabLabel = isProfileFromLoggedUser ? 'Meus livros' : `Livros de ${userFirstName || '...'}`

  const tabProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    }
  }

  const handleChange = (_: React.ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue)
    if (newValue === 1 && isProfileFromLoggedUser) {
      getLikedBooks()
    }
  }

  const getUser = useCallback(async () => {
    setLoadingUser(true)
    const userById = await getUserById(id || userState.id)

    if (!userById) navigate('/home')

    setUser(userById)
    setLoadingUser(false)
  }, [id])

  const getUserBooks = useCallback(async () => {
    setLoadingUserBooks(true)
    const books = await getAllBooksByUserId(id || userState.id)

    setUserBooks(books)
    setLoadingUserBooks(false)
  }, [id])

  const getLikedBooks = useCallback(async () => {
    setLoadingLikedBooks(true)
    const books = await getLikedBooksRequest()

    setLikedBooks(books)
    setLoadingLikedBooks(false)
  }, [])

  const uploadUserImage = async (image: File) => {
    try {
      setUploadPhotoLoading(true)
      if (user?.imageUrl) {
        const imageDeleteRef = getStorageRef(`images/user/${user.email}/avatar/${user.imageName}`)

        await deleteFile(imageDeleteRef)
      }

      const imageRef = getStorageRef(`images/user/${userState.email}/avatar/${image.name}`)

      await uploadBytes(imageRef, image, { contentType: image.type }).then(async (imageUploaded) => {
        const imageUrl = await getDownloadURL(imageUploaded.ref)
        const response = await updateUserById(userState.id, { imageUrl, imageName: image.name })

        if (response) {
          setUser(response)
          getUserBooks()
        }
      })
      setUploadPhotoLoading(false)
    } catch {
      setUploadPhotoLoading(false)
    }
  }

  const centeredLoading = () => {
    return (
      <div style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
        <CircularProgress />
      </div>
    )
  }

  const renderLikedBooks = () => {
    if (loadingLikedBooks) return centeredLoading()

    if (!likedBooks.length) {
      return (
        <div style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
          <Typography variant="subtitle1" color="textPrimary">
              Você ainda não curtiu nenhum livro
          </Typography>
        </div>

      )
    }

    if (likedBooks.length) {
      return (likedBooks.map((book) => <BookCard id={book.id} key={book.id} book={book} listBooks={getLikedBooks} />))
    }

    return centeredLoading()
  }

  const renderUserBooks = () => {
    if (loadingUserBooks) return centeredLoading()

    if (!userBooks.length) {
      return (
        <div style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
          <Typography variant="subtitle1" color="textPrimary">
              Nenhum livro publicado
          </Typography>
        </div>
      )
    }

    if (userBooks.length) {
      return (userBooks.map((book) => <BookCard id={book.id} key={book.id} book={book} listBooks={getUserBooks} />))
    }

    return centeredLoading()
  }

  useEffect(() => {
    getUser()
    getUserBooks()
    isProfileFromLoggedUser && getLikedBooks()
  }, [getUser, getUserBooks, getLikedBooks])

  useEffect(() => {
    setValue(0)
  }, [user?.id])

  return (
    <>
      <PageDecorator title={userFirstName ? `${userFirstName} | Escambooks - Perfil de usuário` : 'Escambooks - Perfil de usuário'} description={'Escambooks - profile'} />
      <HeaderMenu />
      <Grid
        container
        justifyContent={loadingUser ? 'center' : 'flex-start'}
        alignContent="center"
      >
        {!loadingUser
          ? <>
          <Grid item xs={12} md={3}>
          <Paper className={classes.paper}>
            <Box position="relative" display="flex" alignItems="center" justifyContent="center">
                {uploadPhotoLoading ? <div className={classes.userPhoto} style={{ background: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: '50%' }}><CircularProgress /></div> : <Avatar src={user?.imageUrl || userDefault} alt="User photo" className={classes.userPhoto}/>}
                {isProfileFromLoggedUser && (
                  <label htmlFor="icon-photo-user-url" className={classes.photoButton}>
                    <Input
                      accept="image/*"
                      id="icon-photo-user-url"
                      type="file"
                      onChange={async (e) => await (e.target.files?.length && uploadUserImage(e.target.files[0])) }
                    />
                    <IconButton color="primary" aria-label="upload picture" component="span" style={{ width: '32px', height: '32px', padding: 0 }}>
                      <PhotoCamera />
                    </IconButton>
                  </label>
                )}
            </Box>
            <div>
              <p>{user?.name}</p>
              {user?.birthDate && <p>{calculateAge(user.birthDate)} anos</p>}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9} lg={7} xl={6}>
          <Box p={5}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="tabs"
            >
              <Tab label={booksTabLabel} {...tabProps(0)} />
              {isProfileFromLoggedUser && <Tab label="Livros que curti" {...tabProps(1)} /> }
            </Tabs>
            <TabMenu value={value} index={0}>
              {renderUserBooks()}
            </TabMenu>
            {isProfileFromLoggedUser && <TabMenu value={value} index={1}>
              {renderLikedBooks()}
            </TabMenu>}
          </Box>
        </Grid>
        </>
          : <LoadingSimple/>}
      </Grid>
    </>
  )
}

export default UserProfile
