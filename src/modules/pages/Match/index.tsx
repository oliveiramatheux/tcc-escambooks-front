import { Avatar, Box, CardMedia, Grid, Typography } from '@material-ui/core'
import PageDecorator from '../../components/PageDecorator'
import { handleEventScreen } from 'utils/analytics/analytics'
import HeaderMenu from '../../components/HeaderMenu'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Book, MatchDetails, User, getMatchDetails } from 'routes/services'
import LoadingSimple from 'modules/components/LoadingSimple'
import useStyles from './styles'
import setasTroca from '../../../images/setas-troca.png'

const Match = (): JSX.Element => {
  handleEventScreen('escambooks_match', 'match')

  const classes = useStyles()
  const { state } = useLocation()
  const navigate = useNavigate()

  const [matchDetails, setMatchDetails] = useState<MatchDetails | undefined>()
  const [loading, setLoading] = useState(true)

  const matchId = useMemo((): string | undefined => state?.matchId, [state])

  const handleMatchDetails = useCallback(async () => {
    if (!matchId) return

    setLoading(true)

    const matchDetailsData = await getMatchDetails(matchId)

    if (!matchDetailsData) {
      navigate('/home')
      return
    }

    setMatchDetails(matchDetailsData)
    setLoading(false)
  }, [matchId, navigate])

  useEffect(() => {
    handleMatchDetails()
  }, [handleMatchDetails])

  useEffect(() => {
    if (!matchId) navigate('/home')
  }, [matchId, navigate])

  const renderMatchPublication = (user: User, book: Book) => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'ceneter', alignItems: 'center' }}>
        <Typography variant="h3" style={{ marginBottom: '20px' }}>{book.title}</Typography>
        <CardMedia
            component="img"
            image={book.imageUrl}
            alt="Book image"
            className={classes.bookImage}
        />
        <Avatar src={user.imageUrl} alt="User photo" className={classes.userPhoto} style={{ margin: '20px 0 10px 0' }}/>
        <Typography variant="h5" style={{ marginBottom: '20px' }}>
          {user.name}
        </Typography>
        <Typography variant="h6">Contatos:</Typography>
        <Typography variant="body1">Email: {user.email}</Typography>
      </Box>
    )
  }

  return (
    <>
      {loading
        ? <LoadingSimple/>
        : (
          <>
            <PageDecorator title={'Escambooks - Match'} description={'Escambooks - Match'} />
            <HeaderMenu />
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignContent="center"
                className={classes.gridContainer}
              >
                <Grid
                  item
                  xs={12} md={5} lg={5} xl={5}
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {!!matchDetails && renderMatchPublication(matchDetails.currentUser, matchDetails.currentUserBook)}
                </Grid>
                <Grid
                  item
                  xs={12} md={2} lg={2} xl={2}
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={setasTroca} style={{ maxHeight: '200px', maxWidth: '200px', padding: '40px' }} alt="Imagem de setas" />
                </Grid>
                <Grid
                  item
                  xs={12} md={5} lg={5} xl={5}
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {!!matchDetails && renderMatchPublication(matchDetails.otherUser, matchDetails.otherUserBook)}
                </Grid>
              </Grid>
            </>
          )}
    </>
  )
}

export default Match
