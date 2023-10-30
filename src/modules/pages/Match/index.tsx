import { Box, CardMedia, Grid, Typography } from '@material-ui/core'
import PageDecorator from '../../components/PageDecorator'
import { handleEventScreen } from 'utils/analytics/analytics'
import HeaderMenu from '../../components/HeaderMenu'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Book, MatchDetails, User, getMatchDetails } from 'routes/services'
import LoadingSimple from 'modules/components/LoadingSimple'

const Match = (): JSX.Element => {
  handleEventScreen('escambooks_match', 'match')

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
        <Typography variant="h3">{book.title}</Typography>
        <CardMedia
            component="img"
            image={book.imageUrl}
            alt="Book image"
            style={{
              height: '500px',
              width: '500px',
              objectFit: 'cover'
            }}
          />
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'ceneter', alignItems: 'center' }}>
          Foto do usuario
          <Typography variant="h5">
            {user.name}
          </Typography>
        </Box>
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
                style={{ height: 'calc(100vh - 64px)' }}
              >
                <Grid item xs={12} md={6} lg={6} xl={6}>
                  {!!matchDetails && renderMatchPublication(matchDetails.currentUser, matchDetails.currentUserBook)}
                </Grid>
                <Grid item xs={12} md={6} lg={6} xl={6}>
                  {!!matchDetails && renderMatchPublication(matchDetails.otherUser, matchDetails.otherUserBook)}
                </Grid>
              </Grid>
            </>
          )}
    </>
  )
}

export default Match
