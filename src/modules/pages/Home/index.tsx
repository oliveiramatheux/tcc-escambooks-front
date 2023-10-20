import { Grid } from '@material-ui/core'
import PageDecorator from '../../components/PageDecorator'
import UserInfo from '../../components/UserInfo'
import BookPublication from '../../components/BookPublication'
import { handleEventScreen } from 'utils/analytics/analytics'
import HeaderMenu from '../../components/HeaderMenu'

const Home = (): JSX.Element => {
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
