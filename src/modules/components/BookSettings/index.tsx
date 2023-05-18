import React, { useState } from 'react'
import { styled, alpha } from '@mui/material/styles'
import Menu, { MenuProps } from '@mui/material/Menu'
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

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0'
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        )
      }
    }
  }
}))

interface IBookSettingsProps {
  listBooks: () => void
  bookData: Book
}

const BookSettings = (props: IBookSettingsProps): JSX.Element => {
  const { listBooks, bookData } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const [openModalBookEdit, setOpenModalBookEdit] = useState<boolean>(false)
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
    const response = await deleteBookById(bookData.id)

    if (response) {
      const imageRef = getStorageRef(`images/user/${bookData.userEmail}/books/${bookData.id}/${bookData.imageName}`)
      await deleteFile(imageRef)
      listBooks()
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
        onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
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
      </StyledMenu>
      <Modal
        open={openModalDelete}
        closeAction={handleCloseModalBookDelete}
        title={'Excluir Livro'}
        description={'Tem certeza que deseja excluir esse livro?'}
        confirmAction={onClickDeleteAction}
      />
      <ModalBookEdit
        open={openModalBookEdit}
        closeAction={handleCloseModalBookEdit}
        bookData={bookData}
      />
    </div>
  )
}

export default BookSettings
