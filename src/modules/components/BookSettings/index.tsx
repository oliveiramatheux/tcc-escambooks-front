import React, { useState } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import EditIcon from '@mui/icons-material/Edit'
import Divider from '@mui/material/Divider'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/material/IconButton'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import { getStorageRef, deleteFile } from '../../../config/firebase'
import Modal from '../Modal'
import { Book, deleteBookById } from '../../../routes/services/books'
import ModalBookEdit from '../ModalBookEdit'
import useStyles from './styles'

interface IBookSettingsProps {
  listBooks: () => void
  bookData: Book
}

const BookSettings = (props: IBookSettingsProps): JSX.Element => {
  const { listBooks, bookData } = props
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const [openModalBookEdit, setOpenModalBookEdit] = useState<boolean>(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleCloseModalBookDelete = () => {
    setOpenModalDelete(false)
  }

  const handleCloseModalBookEdit = () => {
    setOpenModalBookEdit(false)
    listBooks()
  }

  const onClickDeleteAction = async () => {
    try {
      setDeleteLoading(true)
      const response = await deleteBookById(bookData.id)

      if (response) {
        const imageRef = getStorageRef(`images/user/${bookData.userEmail}/books/${bookData.id}/${bookData.imageName}`)
        await deleteFile(imageRef)
        listBooks()
      }
      setDeleteLoading(false)
      handleCloseModalBookDelete()
    } catch {
      setDeleteLoading(false)
    }
  }

  return (
    <div>
      <IconButton
        aria-label="settings"
        id="demo-customized-button"
        aria-controls="demo-customized-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className={classes.button}
      >
        <MoreVertIcon color="inherit"/>
      </IconButton>
      <Menu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        elevation={0}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        className={classes.root}
      >
        <MenuItem onClick={() => {
          handleClose()
          setOpenModalBookEdit(true)
        }} disableRipple>
          <EditIcon />
          Editar
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={() => {
          handleClose()
          setOpenModalDelete(true)
        }} disableRipple>
          <DeleteForeverRoundedIcon />
          Excluir
        </MenuItem>
      </Menu>
      {openModalDelete && (<Modal
        open={openModalDelete}
        closeAction={handleCloseModalBookDelete}
        title={'Excluir Livro'}
        description={'Tem certeza que deseja excluir esse livro?'}
        confirmAction={onClickDeleteAction}
        loading={deleteLoading}
      />)}
      {openModalBookEdit && (<ModalBookEdit
        open={openModalBookEdit}
        closeAction={handleCloseModalBookEdit}
        bookData={bookData}
      />)}
    </div>
  )
}

export default BookSettings
