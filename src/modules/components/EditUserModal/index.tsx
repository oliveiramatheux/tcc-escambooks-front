import { updateUserById, User } from '../../../routes/services'
import useStyles from './styles'
import { useTheme } from '@mui/material/styles'
import { useForm } from 'react-hook-form'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContentText from '@mui/material/DialogContentText'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Button, FormControl, FormHelperText, InputLabel, OutlinedInput, Typography } from '@material-ui/core'
import { LoadingButton } from '@mui/lab'
import { useState } from 'react'
import SaveIcon from '@mui/icons-material/Save'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../../store/rootReducer'
import { regexEmail, regexPhoneNumber } from '../../../utils/regex'

interface IEditUserModalProps {
  open: boolean
  user: User
  onClose: () => void
  onSuccess: (user: User) => void
}

export interface UserFormState {
  phone?: string
  address?: string
  email?: string
}

const EditUserModal = ({ open, user, onClose, onSuccess }: IEditUserModalProps) => {
  const classes = useStyles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [loading, setLoading] = useState(false)

  const { user: userState } = useSelector(
    (state: ApplicationState) => state
  )

  const defaultValues: UserFormState = {
    address: user.address,
    email: user.email,
    phone: user.phone
  }

  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<UserFormState>({ mode: 'onBlur', defaultValues })

  const handleClose = () => {
    onClose()
  }

  const onSubmit = async (data: UserFormState) => {
    setLoading(true)

    const response = await updateUserById(userState.id, data)

    if (response) {
      onSuccess(response)
    }
    setLoading(false)
    handleClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
      className={classes.dialog}
    >
      <DialogTitle id="scroll-dialog-title" className={classes.modalTitle}>Informações adicionais</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
        <DialogContent className={classes.root}>
          <DialogContentText>
            <Typography color="textPrimary">
              Preencha as suas informações
            </Typography>
          </DialogContentText>
          <FormControl className={classes.formControl} variant="outlined">
            <InputLabel htmlFor="outlined-email" className={errors.email ? classes.errorHelperText : ''}>Email</InputLabel>
              <OutlinedInput
                id="outlined-email"
                labelWidth={40}
                error={!!errors.email}
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
            <InputLabel htmlFor="outlined-phone" className={errors.phone ? classes.errorHelperText : ''}>Celular</InputLabel>
            <OutlinedInput
              id="outlined-phone"
              labelWidth={50}
              error={!!errors.phone}
              defaultValue={user.phone}
              {...register('phone', {
                pattern: {
                  value: regexPhoneNumber,
                  message: 'O n° de celular deve ser válido.'
                }
              })}
            />
            {errors.phone && (<FormHelperText id="outlined-helper-text-phone" className={classes.errorHelperText}>{errors.phone.message}</FormHelperText>)}
          </FormControl>
          <FormControl className={classes.formControl} variant="outlined">
            <InputLabel htmlFor="outlined-address" className={errors.address ? classes.errorHelperText : ''}>Endereço</InputLabel>
            <OutlinedInput
              id="outlined-address"
              labelWidth={70}
              error={!!errors.address}
              defaultValue={user.address}
              {...register('address', {
                maxLength: {
                  value: 100,
                  message: 'O endereço deve conter no máximo 100 caracteres.'
                }
              })}
            />
            {errors.address && (<FormHelperText id="outlined-helper-text-address" className={classes.errorHelperText}>{errors.address.message}</FormHelperText>)}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <div className={classes.divButtons}>
            <LoadingButton
              variant="contained"
              color="primary"
              sx={{ margin: '16px' }}
              type={'submit'}
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              disabled={!isDirty}
            >
              Editar
            </LoadingButton>
            <Button
              variant="text"
              size="medium"
              className={classes.button}
              onClick={() => {
                handleClose()
              }}
            >
              Fechar
            </Button>
          </div>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EditUserModal
