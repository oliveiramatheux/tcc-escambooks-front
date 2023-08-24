import { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import { ApplicationState } from '../../../store/rootReducer'
import { useSelector } from 'react-redux'
import HeaderMenu from '../../components/HeaderMenu'
import PageDecorator from '../../components/PageDecorator'
import UserInfo from '../../components/UserInfo'
import BookPublication from '../../components/BookPublication'
import { handleEventUserInfos, handleEventScreen } from 'utils/analytics/analytics'

const Home = (): JSX.Element => {
  const { user } = useSelector(
    (state: ApplicationState) => state
  )

  const navigate = useNavigate()

  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate('/login')
    }
  }, [navigate, user])

  handleEventUserInfos(user)
  handleEventScreen('escambooks_home', 'home')

  return (
    <>
      <PageDecorator title={'Escambooks'} description={'Escambooks - timeline'} />
      <HeaderMenu />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignContent="center"
      >
        <Grid item xs={12} md={3} >
          <UserInfo/>
        </Grid>
        <Grid item xs={12} md={9} lg={7} xl={6}>
          <BookPublication/>
        </Grid>
      </Grid>
    </>
  )
}

export default Home
