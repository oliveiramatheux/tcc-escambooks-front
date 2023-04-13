import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Paper, FormControl,
  InputLabel, OutlinedInput,
  FormControlLabel,
  InputAdornment, IconButton, Button,
  Switch, Link, FormHelperText
} from '@material-ui/core'
import useStyles from './styles'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import iconGoogle from '../../../images/icons/google.png'
import { auth, googleProvider, signInWithPopup } from '../../../config/firebase'
import { ApplicationState } from '../../../store/rootReducer'
import { useNavigate } from 'react-router-dom'
import { checkUserAuthGoogle, userAuthLogin } from '../../../store/users/actions'
import { useForm, Controller } from 'react-hook-form'
import { regexEmail, regexPassword } from '../../../utils/regex'
import { AxiosResponse, AxiosError } from 'axios'
import { addInterceptor } from '../../../routes/services/axios'
import { errorHandler, errorInterface } from '../../../utils/errorHandler'
import { authSendEmailVerify } from '../../../routes/services/auth'

interface LoginFormState {
  email: string;
  password: string;
  showPassword: boolean;
  checkedEmail: boolean;
}

const LoginForm = (): JSX.Element => {
  const classes = useStyles()

  const { user } = useSelector(
    (state: ApplicationState) => state
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [redirect, setredirect] = useState<string | null>(null)

  const [errorsResponse, setErrorsResponse] = useState<errorInterface>({
    errorStatusCode: undefined,
    errorMessage: undefined
  })

  const { register, handleSubmit, control, getValues, setValue, formState: { errors } } = useForm<LoginFormState>({ mode: 'onBlur' })

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const clearErrorResponse = () => {
    setErrorsResponse({
      errorStatusCode: undefined,
      errorMessage: undefined
    })
  }

  const handleMouseDown = () => {
    clearErrorResponse()
  }

  const handleClickLoginWithGoogleButton = () => {
    clearErrorResponse()
    signInWithPopup(auth, googleProvider).then((res) => {
      if (res.user) {
        dispatch(checkUserAuthGoogle({ email: res.user.email, name: res.user.displayName, photoURL: res.user.photoURL }))
      }
    }).catch((error) => {
      setErrorsResponse({ errorStatusCode: error.code, errorMessage: error.message })
    })
  }

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(checkUserAuthGoogle({ email: user.email, name: user.displayName, photoURL: user.photoURL }))
      }
    })
  }, [])

  useEffect(() => {
    if (user.isAuthenticated) {
      console.log('autenticado')
      // setredirect('/loading')
    }
  }, [user])

  useEffect(() => {
    addInterceptor(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        const errorAuthLogin =
          error.response?.config.url === '/auth' &&
          error.response?.config.method === 'post'
        if (errorAuthLogin) {
          if (error.response?.status === 401 && error.response?.data === 'Error: This user not verify email') {
            authSendEmailVerify({ email: getValues('email') })
          }
          setErrorsResponse({ errorStatusCode: String(error.response?.status), errorMessage: error.response?.data as string | undefined })
        }
        return Promise.reject(error)
      }
    )
  }, [])

  const onSubmit = (data: LoginFormState) => {
    const payload = {
      email: data.email,
      password: data.password
    }
    if (data.checkedEmail) {
      localStorage.setItem('email', data.email)
    } else {
      localStorage.removeItem('email')
    }
    dispatch(userAuthLogin(payload))
    setValue('password', '')
  }

  if (redirect) {
    navigate(redirect)
  }

  const handleClickForgetInfoLink = () => {
    navigate('/forgot-password')
  }

  return (
    <>
      <Paper elevation={0} className={classes.paper}>
        <div className={classes.root}>
          <h2>Entrar</h2>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
            <FormControl className={classes.formControl} variant="outlined">
              {!errors.email ? (<InputLabel htmlFor="outlined-email">Email</InputLabel>) : (<InputLabel htmlFor="outlined-email" className={classes.errorHelperText}>Email</InputLabel>)}
              <OutlinedInput
                id="outlined-email"
                labelWidth={40}
                defaultValue={localStorage.getItem('email')}
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
            <FormControl className={classes.formControl} variant="outlined">
              {!errors.password ? (<InputLabel htmlFor="outlined-password">Senha</InputLabel>) : (<InputLabel htmlFor="outlined-password" className={classes.errorHelperText}>Senha</InputLabel>)}
              <OutlinedInput
                id="outlined-password"
                type={showPassword ? 'text' : 'password'}
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
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDown}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={50}
              />
              {errors.password && (<FormHelperText id="outlined-helper-text-password" className={classes.errorHelperText}>{errors.password.message}</FormHelperText>)}
            </FormControl>
            {errorsResponse.errorStatusCode && errorsResponse.errorMessage && (<span id="outlined-helper-text-apiError" className={classes.errorHelperText}>{errorHandler(errorsResponse.errorStatusCode, errorsResponse.errorMessage)}</span>)}
            <FormControlLabel
              className={classes.formControl}
              control={
                <Controller
                  control={control}
                  name="checkedEmail"
                  defaultValue={!!localStorage.getItem('email')}
                  render={({ field: { onChange, value, ref } }) => (
                    <Switch
                      id="controller-rememberMe"
                      checked={value}
                      inputRef={ref}
                      onChange={e => onChange(e.target.checked)}
                      name="checkedEmail"
                      color="primary"
                    />
                  )}
                />
              }
              label="Lembrar de mim."
            />
            <Link
              id="link-forgot-password"
              className={classes.link}
              variant="body2"
              onClick={handleClickForgetInfoLink}
            >
              Esqueceu sua senha?
            </Link>
            <div className={classes.divButtons}>
              <Button
                variant="contained"
                color="primary"
                id="buttonLogin"
                size="large"
                className={classes.button}
                startIcon={<ExitToAppIcon />}
                type={'submit'}
                disabled={user.loading}
              >
                Entrar
              </Button>
              <Button
                variant="outlined"
                color="default"
                size="large"
                className={classes.button}
                startIcon={<img src={iconGoogle} alt="Icon google" />}
                onClick={handleClickLoginWithGoogleButton}
              >
                Entrar com o Google
              </Button>
            </div>
          </form>
        </div>
      </Paper>
    </>
  )
}

export default LoginForm
