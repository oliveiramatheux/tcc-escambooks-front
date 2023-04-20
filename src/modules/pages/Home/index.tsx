import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import { ApplicationState } from '../../../store/rootReducer'
import { useSelector } from 'react-redux'
import useStyles from './styles'
import HeaderMenu from '../../components/HeaderMenu'
import PageDecorator from '../../components/PageDecorator'
import UserInfo from '../../components/UserInfo'
import BookPublication from '../../components/BookPublication'

const Home = (): JSX.Element => {
  const { user } = useSelector(
    (state: ApplicationState) => state
  )
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const classes = useStyles()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate('/login')
    }
  }, [user])

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
        <Grid item xs={12} md={3} lg={3}>
          <UserInfo/>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <BookPublication/>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
        </Grid>
      </Grid>
    </>
  )
}

export default Home
