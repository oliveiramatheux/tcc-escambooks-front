import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Grid, Paper, Button, FormControl, OutlinedInput, InputLabel, FormHelperText } from '@material-ui/core'
import useStyles from './styles'
import { AxiosResponse, AxiosError } from 'axios'
import { addInterceptor } from '../../../routes/services/axios'
import { errorHandler, errorInterface } from '../../../utils/errorHandler'
import { useNavigate } from 'react-router-dom'
import { authSendEmailResetPassword } from '../../../routes/services/auth'
import { ApplicationState } from '../../../store/rootReducer'
import animatedBook from '../../../images/animated-book.png'
import HeaderSimpleMenu from '../../components/HeaderSimpleMenu'
import { regexEmail } from '../../../utils/regex'
import { useForm } from 'react-hook-form'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import PageDecorator from '../../components/PageDecorator'

interface ForgotPasswordFormState {
  email: string
}

const ForgotPassword = (): JSX.Element => {
  const classes = useStyles()
  const navigate = useNavigate()

  const { user } = useSelector(
    (state: ApplicationState) => state
  )

  const [errorsResponse, setErrorsResponse] = useState<errorInterface>({
    errorStatusCode: undefined,
    errorMessage: undefined
  })
  const [sendEmailResetPasswordFeedback, setSendEmailResetPasswordFeedback] = useState<string | undefined>(undefined)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ForgotPasswordFormState>({ mode: 'onBlur' })

  const clearErrorResponse = () => {
    setErrorsResponse({
      errorStatusCode: undefined,
      errorMessage: undefined
    })
  }

  const handleMouseDown = () => {
    clearErrorResponse()
  }

  useEffect(() => {
    addInterceptor(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const errorSendEmailResetPassword =
          error.response?.config.url === '/auth/send/email-reset-password' &&
          error.response?.config.method === 'post'
        if (errorSendEmailResetPassword) {
          setErrorsResponse({ errorStatusCode: String(error.response?.status), errorMessage: error.response?.data as string | undefined })
          reset({ email: undefined })
        }
        return await Promise.reject(error)
      }
    )
  }, [])

  const onSubmit = async (data: ForgotPasswordFormState) => {
    const payload = {
      email: data.email
    }
    const response = await authSendEmailResetPassword(payload)
    if (response.status === 200 && response.data) {
      setSendEmailResetPasswordFeedback('Foi enviado um email com instruções para redefinição da senha.')
      reset({ email: undefined })
    }
  }

  useEffect(() => {
    if (user.isAuthenticated) {
      navigate('/home')
    }
  }, [user])

  return (
    <>
      <PageDecorator title={'Escambooks - esqueci minha senha'} description={'Escambooks - esqueci minha senha'} />
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
          <Grid item md={6} lg={4} className={classes.gridSendEmailResetPassword}>
            <Paper elevation={0} className={classes.paper}>
              <div className={classes.root}>
                <h2>Redefinição de senha</h2>
                {sendEmailResetPasswordFeedback
                  ? (
                    <div>
                      <img src={animatedBook} alt="Animated book" className={classes.animatedBook} />
                      <h4 className={classes.successHelperText}>{sendEmailResetPasswordFeedback}</h4>
                    </div>
                    )
                  : (
                    <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
                      <h4>Insira seu email para enviarmos as orientações de redefinição de senha.</h4>
                      <FormControl className={classes.formControl} variant="outlined">
                        {!errors.email ? (<InputLabel htmlFor="outlined-email">Email</InputLabel>) : (<InputLabel htmlFor="outlined-email" className={classes.errorHelperText}>Email</InputLabel>)}
                        <OutlinedInput
                          id="outlined-email"
                          labelWidth={40}
                          error={!!errors.email}
                          onMouseDown={handleMouseDown}
                          {...register('email', {
                            required: 'O email é obrigatório.',
                            pattern: {
                              value: regexEmail,
                              message: 'O email deve ser válido.'
                            },
                            maxLength: {
                              value: 50,
                              message: 'O email deve conter no máximo 50 caracteres.'
                            }
                          })}
                        />
                        {errors.email && (<FormHelperText id="outlined-helper-text-email" className={classes.errorHelperText}>{errors.email.message}</FormHelperText>)}
                      </FormControl>
                      {errorsResponse.errorStatusCode && errorsResponse.errorMessage && (
                        <h4 className={classes.errorHelperText}>{errorHandler(errorsResponse.errorStatusCode, errorsResponse.errorMessage)}</h4>
                      )}
                      <div className={classes.divButtons}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          className={classes.button}
                          startIcon={<EmailRoundedIcon />}
                          type={'submit'}
                        >
                          Enviar
                        </Button>
                      </div>
                    </form>
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

export default ForgotPassword
