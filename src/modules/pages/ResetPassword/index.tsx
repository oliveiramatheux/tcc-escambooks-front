import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Grid, Paper, Button, FormControl, OutlinedInput, InputLabel, FormHelperText } from '@material-ui/core'
import useStyles from './styles'
import { AxiosResponse, AxiosError } from 'axios'
import { addInterceptor } from '../../../routes/services/axios'
import { errorHandler, errorInterface } from '../../../utils/errorHandler'
import { useNavigate } from 'react-router-dom'
import { authResetPassword } from '../../../routes/services/auth'
import { ApplicationState } from '../../../store/rootReducer'
import animatedBook from '../../../images/animated-book.png'
import HeaderSimpleMenu from '../../components/HeaderSimpleMenu'
import { regexPassword } from '../../../utils/regex'
import { useForm } from 'react-hook-form'
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded'
import PageDecorator from '../../components/PageDecorator'

interface ResetPasswordFormState {
  password: string
  confirmPassword: string
}

interface queryParams {
  email?: string
  token?: string
}

const ResetPassword = (): JSX.Element => {
  const classes = useStyles()
  const navigate = useNavigate()

  const { user } = useSelector(
    (state: ApplicationState) => state
  )

  const [errorsResponse, setErrorsResponse] = useState<errorInterface>({
    errorStatusCode: undefined,
    errorMessage: undefined
  })
  const [resetPasswordFeedback, setResetPasswordFeedback] = useState<string | undefined>(undefined)
  const [queryParams, setQueryParams] = useState<queryParams>({
    email: undefined,
    token: undefined
  })

  const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm<ResetPasswordFormState>({ mode: 'onBlur' })

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
          error.response?.config.url === '/auth/reset-password-token' &&
          error.response?.config.method === 'post'
        if (errorSendEmailResetPassword) {
          setErrorsResponse({ errorStatusCode: String(error.response?.status), errorMessage: error.response?.data as string | undefined })
          reset({ password: undefined, confirmPassword: undefined })
        }
        return await Promise.reject(error)
      }
    )
  }, [])

  const onSubmit = async (data: ResetPasswordFormState) => {
    if (queryParams.email && queryParams.token) {
      const payload = {
        email: queryParams.email,
        newPassword: data.password,
        resetToken: queryParams.token
      }
      const response = await authResetPassword(payload)
      if (response.status === 200 && response.data) {
        setResetPasswordFeedback('Senha redefinida com sucesso.')
        reset({ password: undefined, confirmPassword: undefined })
        return
      }
    }
    setResetPasswordFeedback('O link para redefinir a senha expirou :(')
  }

  const initialSetup = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const email = urlParams.get('email')
    const token = urlParams.get('token')

    if (email && token) {
      setQueryParams({ email, token })
      return
    }
    setResetPasswordFeedback('O link para redefinir a senha expirou :(')
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
      <PageDecorator title={'Escambooks - redefinição de senha'} description={'Escambooks - redefinição de senha'} />
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
          <Grid item md={6} lg={4} className={classes.gridResetPassword}>
            <Paper elevation={0} className={classes.paper}>
              <div className={classes.root}>
                <h2>Redefinição de senha</h2>
                {resetPasswordFeedback
                  ? (
                    <div>
                      <img src={animatedBook} alt="Animated book" className={classes.animatedBook} />
                      <h4 className={classes.successHelperText}>{resetPasswordFeedback}</h4>
                    </div>
                    )
                  : (
                    <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
                      <h4>Insira sua nova senha.</h4>
                      <FormControl className={classes.formControl} variant="outlined">
                        {!errors.password ? (<InputLabel htmlFor="outlined-password">Senha</InputLabel>) : (<InputLabel htmlFor="outlined-password" className={classes.errorHelperText}>Senha</InputLabel>)}
                        <OutlinedInput
                          id="outlined-password"
                          type={'password'}
                          defaultValue=''
                          error={!!errors.password}
                          onMouseDown={handleMouseDown}
                          {...register('password', {
                            required: 'A senha é obrigatória.',
                            minLength: {
                              value: 8,
                              message: 'A senha deve conter no mínimo 8 caracteres.'
                            },
                            pattern: {
                              value: regexPassword,
                              message: 'A senha deve conter letras, ao menos um número, uma letra maiúscula ou um caracter especial.'
                            },
                            maxLength: {
                              value: 30,
                              message: 'A senha deve conter no máximo 30 caracteres.'
                            }
                          })}
                          labelWidth={50}
                        />
                        {errors.password && (<FormHelperText id="outlined-helper-text-password" className={classes.errorHelperText}>{errors.password.message}</FormHelperText>)}
                      </FormControl>
                      <FormControl className={classes.formControl} variant="outlined">
                        {!errors.confirmPassword ? (<InputLabel htmlFor="outlined-confirmPassword">Confirme a senha</InputLabel>) : (<InputLabel htmlFor="outlined-confirmPassword" className={classes.errorHelperText}>Confirme a senha</InputLabel>)}
                        <OutlinedInput
                          id="outlined-confirmPassword"
                          type={'password'}
                          defaultValue=''
                          error={!!errors.confirmPassword}
                          onMouseDown={handleMouseDown}
                          {...register('confirmPassword', {
                            required: 'A confirmação de senha é obrigatória.',
                            validate: {
                              matchesPreviousPassword: (value) => {
                                const { password } = getValues()
                                return password === value || 'As senhas não coincidem.'
                              }
                            }
                          })}
                          labelWidth={130}
                        />
                        {errors.confirmPassword && (<FormHelperText id="outlined-helper-text-confirmPassword" className={classes.errorHelperText}>{errors.confirmPassword.message}</FormHelperText>)}
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
                          startIcon={<VpnKeyRoundedIcon />}
                          type={'submit'}
                        >
                          Redefinir
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

export default ResetPassword
