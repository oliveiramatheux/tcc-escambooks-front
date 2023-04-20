import React from 'react'
import useStyles from './styles'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Button } from '@material-ui/core'
import Grid from '@material-ui/core/Grid/Grid'

interface InterfaceModalProps {
  open: boolean
  title: string
  description: string | React.ReactNode
  closeAction: () => void
}

const Modal = (props: InterfaceModalProps): JSX.Element => {
  const { open, title, description, closeAction } = props
  const classes = useStyles()
  return (
    <>
      <div>
        <Dialog
          open={open}
          onClose={closeAction}
          scroll={'paper'}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title" className={classes.modalTitle}>{title}</DialogTitle>
          <DialogContent dividers id="scroll-dialog-description" tabIndex={-1}>
            {description}
          </DialogContent>
          <DialogActions>
            <Grid container justifyContent="flex-start">
              <Grid item>
                <label className={classes.rightsFooter}>@{new Date().getFullYear()} Escambooks, All rights reserved</label>
              </Grid>
            </Grid>
            <Button onClick={closeAction}>Fechar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}

export default Modal
