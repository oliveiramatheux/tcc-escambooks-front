import React, { useState, useEffect } from 'react'
import {
  Paper, FormControl, Link,
  InputLabel, OutlinedInput, Button,
  FormControlLabel, Switch, FormHelperText
} from '@material-ui/core'
import useStyles from './styles'
import CreateRoundedIcon from '@material-ui/icons/CreateRounded'
import { useForm, Controller } from 'react-hook-form'
import { regexEmail, regexPassword } from '../../../utils/regex'
import { AxiosResponse, AxiosError } from 'axios'
import { addInterceptor } from '../../../routes/services/axios'
import { errorHandler, errorInterface } from '../../../utils/errorHandler'
import { userCreate } from '../../../routes/services/user'
import Modal from '../Modal'
import TermsAndConditions from '../TermsAndConditions'

interface RegisterFormState{
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

const RegisterForm = (): JSX.Element => {
  const classes = useStyles()

  const { register, handleSubmit, control, getValues, setValue, formState: { errors } } = useForm<RegisterFormState>({ mode: 'onBlur' })

  const [errorsResponse, setErrorsResponse] = useState<errorInterface>({
    errorStatusCode: undefined,
    errorMessage: undefined
  })
  const [open, setOpen] = useState<boolean>(false)
  const [openModalScroll, setOpenModalScroll] = useState<boolean>(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleCloseModalScroll = () => {
    setOpenModalScroll(false)
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

  useEffect(() => {
    addInterceptor(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        const errorUserCreate =
          error.response?.config.url === '/users' &&
          error.response?.config.method === 'post'
        if (errorUserCreate) {
          setErrorsResponse({ errorStatusCode: String(error.response?.status), errorMessage: error.response?.data as string | undefined })
          setValue('password', '')
          setValue('confirmPassword', '')
          setValue('acceptTerms', false)
        }
        return Promise.reject(error)
      }
    )
  }, [])

  const onSubmit = async (data: RegisterFormState) => {
    const payload = {
      email: data.email,
      name: data.name,
      password: data.password
    }
    const response = await userCreate(payload)

    if (response.status === 201 && response.data) {
      setValue('email', '')
      setValue('name', '')
      setValue('password', '')
      setValue('confirmPassword', '')
      setValue('acceptTerms', false)
      setOpen(true)
    }
  }

  return (
    <>
      <Paper elevation={0} className={classes.paper}>
        <div className={classes.root}>
          <h2>Criar conta</h2>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
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
            <FormControl className={classes.formControl} variant="outlined">
              {!errors.name ? (<InputLabel htmlFor="outlined-name">Nome</InputLabel>) : (<InputLabel htmlFor="outlined-email" className={classes.errorHelperText}>Nome</InputLabel>)}
              <OutlinedInput
                id="outlined-name"
                labelWidth={42}
                error={!!errors.name}
                onMouseDown={handleMouseDown}
                {...register('name', {
                  required: 'O nome é obrigatório.',
                  maxLength: {
                    value: 50,
                    message: 'O email deve conter no máximo 50 caracteres.'
                  }
                })}
              />
              {errors.name && (<FormHelperText id="outlined-helper-text-name" className={classes.errorHelperText}>{errors.name.message}</FormHelperText>)}
            </FormControl>
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
            <FormControlLabel
              className={classes.formControl}
              control={
                <Controller
                  control={control}
                  name="acceptTerms"
                  defaultValue={false}
                  rules={{ required: 'Os termos são obrigatórios.' }}
                  render={({ field: { onChange, value, ref } }) => (
                    <Switch
                      checked={value}
                      id="controller-acceptTerms"
                      inputRef={ref}
                      onChange={e => onChange(e.target.checked)}
                      name="acceptTerms"
                      color="primary"
                    />
                  )}
                />
              }
              label={
                <div>Aceito os <Link className={classes.link} onClick={() => { setOpenModalScroll(true) }}>termos e condições</Link>.</div>
              }
            />
            {errors.acceptTerms && (<FormHelperText id="outlined-helper-text-acceptTerms" className={classes.errorHelperText}>{errors.acceptTerms.message}</FormHelperText>)}
            {errorsResponse.errorStatusCode && errorsResponse.errorMessage && (<span id="outlined-helper-text-apiError" className={classes.errorHelperText}>{errorHandler(errorsResponse.errorStatusCode, errorsResponse.errorMessage)}</span>)}
            <div className={classes.divButtons}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<CreateRoundedIcon />}
                type={'submit'}
                id="buttonRegisterUser"
              >
                Cadastrar
              </Button>
            </div>
          </form>
        </div>
      </Paper>
      <Modal
        open={open}
        title={'Conta criada com sucesso!'}
        description={'Um email de confirmação foi enviado para o email utilizado no cadastro, siga as instruções para finalizar o processo de criação de conta.'}
        closeAction={handleClose}
      />
      <TermsAndConditions
        open={openModalScroll}
        closeAction={handleCloseModalScroll}
      />
    </>
  )
}

export default RegisterForm
