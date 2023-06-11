import { Box, Grid, Paper, Tab, Tabs, Typography } from '@material-ui/core'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getCurrentUser, getUserById, User } from '../../../routes/services/user'
import { ApplicationState } from '../../../store/rootReducer'
import HeaderMenu from '../../components/HeaderMenu'
import PageDecorator from '../../components/PageDecorator'
import userDefault from '../../../images/user-default.png'
import useStyles from './styles'
import { calculateAge } from '../../../utils/helpers'

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: number
  value: number
}

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

  const { user: userState } = useSelector(
    (state: ApplicationState) => state
  )

  const handleChange = (_: React.ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue)
  }

  const getUser = useCallback(async () => {
    if (id) {
      const booksData = await getUserById(id)
      setUser(booksData)
      return
    }

    const booksData = await getCurrentUser()
    setUser(booksData)
  }, [id])

  useEffect(() => {
    getUser()
  }, [getUser])

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
        justifyContent="center"
        alignContent="center"
      >
        <Grid item xs={12} md={3}>
          <Paper className={classes.paper}>
            <img src={user?.imageUrl || userDefault} alt="User photo" className={classes.userPhoto}/>
            <div>
              <p>{user?.name}</p>
              {user?.birthDate && <p>{calculateAge(user.birthDate)} anos</p>}
              <p>0 Seguindo</p>
              <p>0 Seguidores</p>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
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
              <Tab label="Meus livros" {...a11yProps(0)} />
              <Tab label="Livros que curti" {...a11yProps(1)} />
              {/* <Tab label="Meus matches" {...a11yProps(2)} /> */}
            </Tabs>
            <TabPanel value={value} index={0}>
              Meus livros
            </TabPanel>
            <TabPanel value={value} index={1}>
              Livros que curti
            </TabPanel>
            {/* <TabPanel value={value} index={2}>
              Meus matches
            </TabPanel> */}
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default UserProfile
