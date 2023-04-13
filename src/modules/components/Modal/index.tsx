import React from 'react'
import useStyles from './styles'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Button } from '@material-ui/core'

interface InterfaceModalProps {
  open: boolean;
  title: string;
  description: string;
  closeAction: () => void;
  confirmAction?: () => void;
}

const Modal = (props: InterfaceModalProps): JSX.Element => {
  const { open, title, description, closeAction, confirmAction } = props
  const classes = useStyles()
  return (
    <>
      <Dialog
        open={open}
        onClose={closeAction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
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
            (<Button onClick={confirmAction} autoFocus>
              Confirmar
            </Button>)
          }
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Modal
