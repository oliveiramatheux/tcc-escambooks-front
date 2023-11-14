import React from 'react'
import useStyles from './styles'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Button } from '@material-ui/core'
import { LoadingButton } from '@mui/lab'
import CheckIcon from '@mui/icons-material/Check'

interface InterfaceModalProps {
  open: boolean
  title: string
  description: string
  closeAction: () => void
  confirmAction?: () => void
  loading?: boolean
}

const Modal = (props: InterfaceModalProps): JSX.Element => {
  const { open, title, description, closeAction, confirmAction, loading } = props
  const classes = useStyles()
  return (
    <>
      <Dialog
        open={open}
        onClose={closeAction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.dialog}
      >
        <DialogTitle id="alert-dialog-title" className={classes.modalTitle}>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAction} autoFocus>
            Fechar
          </Button>
          {confirmAction &&
           <LoadingButton
              variant="contained"
              color="primary"
              sx={{ margin: '16px' }}
              onClick={confirmAction}
              loading={loading}
              loadingPosition="start"
              startIcon={<CheckIcon />}
            >
              Confirmar
            </LoadingButton>
          }
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Modal
