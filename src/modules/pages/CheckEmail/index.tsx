import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Grid, Paper } from '@material-ui/core'
import useStyles from './styles'
import { AxiosResponse, AxiosError } from 'axios'
import { addInterceptor } from '../../../routes/services/axios'
import { errorHandler, errorInterface } from '../../../utils/errorHandler'
import { useNavigate } from 'react-router-dom'
import { authVerifyEmail } from '../../../routes/services/auth'
import { ApplicationState } from '../../../store/rootReducer'
import animatedBook from '../../../images/animated-book.png'
import HeaderSimpleMenu from '../../components/HeaderSimpleMenu'
import PageDecorator from '../../components/PageDecorator'

const CheckEmail = (): JSX.Element => {
  const classes = useStyles()
  const navigate = useNavigate()

  const { user } = useSelector(
    (state: ApplicationState) => state
  )

  const [errorsResponse, setErrorsResponse] = useState<errorInterface>({
    errorStatusCode: undefined,
    errorMessage: undefined
  })
  const [sendVerifyEmailFeedback, setSendVerifyEmailFeedback] = useState<string | undefined>(undefined)

  useEffect(() => {
    addInterceptor(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const errorVerifyEmail =
          error.response?.config.url === '/auth/verify' &&
          error.response?.config.method === 'post'
        if (errorVerifyEmail) {
          setErrorsResponse({ errorStatusCode: String(error.response?.status), errorMessage: error.response?.data as string | undefined })
        }
        return await Promise.reject(error)
      }
    )
  }, [])

  const initialSetup = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')

    if (token) {
      const response = await authVerifyEmail({ token })
      if (response.status === 200 && response.data) {
        setSendVerifyEmailFeedback('Email verificado com sucesso.')
        return
      }
    }
    setSendVerifyEmailFeedback('O link para verificar o email expirou :(')
  }

  useEffect(() => {
    initialSetup()
  }, [])

  useEffect(() => {
    if (user.isAuthenticated) {
      navigate('/home')
    }
  }, [user])

  return (
    <>
      <PageDecorator title={'Escambooks - confirmação de email'} description={'Escambooks - confirmação de email'} />
      <HeaderSimpleMenu/>
      <div className={classes.container}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
        >
          <Grid item>
          </Grid>
          <Grid item md={6} lg={4} className={classes.gridCheckEmail}>
            <Paper elevation={0} className={classes.paper}>
              <div className={classes.root}>
                <img src={animatedBook} alt="Animated book" className={classes.animatedBook} />
                <h2>Confirmação de email</h2>
                {sendVerifyEmailFeedback && (
                  <h4 className={classes.successHelperText}>{sendVerifyEmailFeedback}</h4>
                )}
                {errorsResponse.errorStatusCode && errorsResponse.errorMessage && (
                  <h4 className={classes.errorHelperText}>{errorHandler(errorsResponse.errorStatusCode, errorsResponse.errorMessage)}</h4>
                )}
              </div>
            </Paper>
          </Grid>
          <Grid item>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default CheckEmail
