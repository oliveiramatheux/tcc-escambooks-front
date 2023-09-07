import useStyles from './styles'
import ModalWithScroll from '../ModalWithScroll'

interface UserSettingsProps {
  open: boolean
  closeAction: () => void
  deleteUserAction: () => void
}

const UserSettings = (props: UserSettingsProps): JSX.Element => {
  const { open, closeAction, deleteUserAction } = props
  const classes = useStyles()
  return (
    <>
      <ModalWithScroll
        open={open}
        title={'Configurações'}
        description={
          <div className={classes.divContentModalScroll}>
            <p onClick={deleteUserAction} className={classes.textModalScroll}>Excluir minha conta</p>
          </div>
        }
        closeAction={closeAction}
      />
    </>
  )
}

export default UserSettings
