import { Avatar, Box, Grid, IconButton, Paper, Tab, Tabs, Typography } from '@material-ui/core'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserById, User, userUpdate } from '../../../routes/services/user'
import { ApplicationState } from '../../../store/rootReducer'
import HeaderMenu from '../../components/HeaderMenu'
import PageDecorator from '../../components/PageDecorator'
import userDefault from '../../../images/user-default.png'
import useStyles from './styles'
import { calculateAge } from '../../../utils/helpers'
import { Book, getAllBooksByUserId, getLikedBooks as getLikedBooksRequest } from '../../../routes/services/books'
import BookCard from '../../components/BookCard'
import LoadingSimple from '../../components/LoadingSimple'
import { getDownloadURL, getStorageRef, uploadBytes } from '../../../config/firebase'
import { PhotoCamera } from '@material-ui/icons'
import { styled } from '@mui/material/styles'

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: number
  value: number
}

const Input = styled('input')({
  display: 'none'
})

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const UserProfile = () => {
  const { id } = useParams()
  const classes = useStyles()
  const navigate = useNavigate()
  const [value, setValue] = useState(0)
  const [user, setUser] = useState<User>()
  const [userBooks, setUserBooks] = useState<Book[]>([])
  const [likedBooks, setLikedBooks] = useState<Book[]>([])
  const [loadingUserBooks, setLoadingUserBooks] = useState(true)
  const [loadingLikedBooks, setLoadingLikedBooks] = useState(true)

  const { user: userState } = useSelector(
    (state: ApplicationState) => state
  )

  const isProfileFromLoggedUser = !id || id === userState.id

  const booksTabLabel = isProfileFromLoggedUser ? 'Meus livros' : `Livros de ${user?.name.split(' ')[0] || '...'}`

  const handleChange = (_: React.ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue)
    if (newValue === 1) {
      getLikedBooks()
    }
  }

  const getUser = useCallback(async () => {
    const booksData = await getUserById(id || userState.id)
    setUser(booksData)
  }, [id])

  const getUserBooks = useCallback(async () => {
    setLoadingUserBooks(true)
    const booksData = await getAllBooksByUserId(id || userState.id)

    setUserBooks(booksData)
    setLoadingUserBooks(false)
  }, [id])

  const getLikedBooks = useCallback(async () => {
    setLoadingLikedBooks(true)
    const booksData = await getLikedBooksRequest()

    setLikedBooks(booksData)
    setLoadingLikedBooks(false)
  }, [])

  const uploadBookImages = async (image: File) => {
    const imageRef = getStorageRef(`images/user/${userState.email}/avatar/${image.name}`)

    await uploadBytes(imageRef, image, { contentType: image.type }).then(async (imageUploaded) => {
      const imageUrl = await getDownloadURL(imageUploaded.ref)
      await userUpdate(userState.id, { imageUrl, imageName: image.name })
    })
  }

  useEffect(() => {
    getUser()
    getUserBooks()
    getLikedBooks()
  }, [getUser, getUserBooks, getLikedBooks])

  useEffect(() => {
    if (!userState.isAuthenticated) {
      navigate('/login')
    }
  }, [userState])

  return (
    <>
      <PageDecorator title={'Escambooks'} description={'Escambooks - profile'} />
      <HeaderMenu />
      <Grid
        container
        justifyContent="flex-start"
        alignContent="center"
      >
        <Grid item xs={12} md={3}>
          <Paper className={classes.paper}>
            <Box position="relative" display="flex" alignItems="center" justifyContent="center" >
                <Avatar src={user?.imageUrl || userDefault} alt="User photo" className={classes.userPhoto}/>
                {isProfileFromLoggedUser && (
                  <label htmlFor="icon-button-file" className={classes.photoButton}>
                    <Input
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                      onChange={async (e) => await (e.target.files && uploadBookImages(e.target.files[0])) }
                    />
                    <IconButton color="primary" aria-label="upload picture" component="span">
                      <PhotoCamera />
                    </IconButton>
                  </label>
                )}
            </Box>
            <div>
              <p>{user?.name}</p>
              {user?.birthDate && <p>{calculateAge(user.birthDate)} anos</p>}
              <p>0 Seguindo</p>
              <p>0 Seguidores</p>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box p={5}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="tabs"
              className=''
            >
              <Tab label={booksTabLabel} {...a11yProps(0)} />
              {isProfileFromLoggedUser && <Tab label="Livros que curti" {...a11yProps(1)} /> }
            </Tabs>
            <TabPanel value={value} index={0}>
              {!loadingUserBooks
                ? userBooks.map((value) => {
                  return (
                    <BookCard key={value.id} book={value} listBooks={getUserBooks} />
                  )
                })
                : <LoadingSimple/>
              }
            </TabPanel>
            <TabPanel value={value} index={1}>
              {!loadingLikedBooks
                ? likedBooks.map((value) => {
                  return (
                    <BookCard key={value.id} book={value} listBooks={getLikedBooks} />
                  )
                })
                : <LoadingSimple/>
              }
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default UserProfile
