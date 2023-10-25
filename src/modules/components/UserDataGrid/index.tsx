import { useState, useCallback, useEffect } from 'react'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { User, deleteUserById, getAllUsersAdmin } from '../../../routes/services/user'
import { Avatar, IconButton, Paper } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { ApplicationState } from 'store/rootReducer'
import useStyles from './styles'
import userDefault from '../../../images/user-default.png'
import DeleteIcon from '@mui/icons-material/Delete'
import Modal from '../Modal'
import { useNavigate } from 'react-router-dom'
import { deleteFile, getStorageRef } from 'config/firebase'

const UserDataGrid = (): JSX.Element => {
  const { user } = useSelector(
    (state: ApplicationState) => state
  )

  const navigate = useNavigate()
  const classes = useStyles()

  const [users, setUsers] = useState<User[]>([])
  const [selectedUserId, setSelectedUserId] = useState<string>('')
  const [openModalDeleteUser, setOpenModalDeleteUser] = useState(false)
  const [deleteUserLoading, setDeleteUserLoading] = useState(false)

  const handleCloseModalDeleteUser = () => {
    setOpenModalDeleteUser(false)
  }

  const listAllUsers = useCallback(async () => {
    const userData = await getAllUsersAdmin()
    setUsers(userData)
  }, [])

  const onClickDeleteUserAction = async () => {
    try {
      if (!selectedUserId) return
      setDeleteUserLoading(true)
      const deletedUser = await deleteUserById(selectedUserId)

      if (deletedUser?.imageName) {
        const storageUserRef = getStorageRef(`images/user/${deletedUser.email}/avatar/${deletedUser.imageName}`)
        await deleteFile(storageUserRef)
      }

      if (deletedUser?.userBooksImages?.length) {
        deletedUser.userBooksImages.forEach(async userBookImageInfo => {
          const storageUserRef = getStorageRef(`images/user/${deletedUser.email}/books/${userBookImageInfo.bookId}/${userBookImageInfo.bookImageName}`)
          await deleteFile(storageUserRef)
        })
      }

      if (deletedUser) setUsers(users => users.filter(userFiltered => userFiltered.id !== deletedUser.id))
      setDeleteUserLoading(false)
      handleCloseModalDeleteUser()
    } catch {
      setDeleteUserLoading(false)
      handleCloseModalDeleteUser()
    }
  }

  const deleteUserButton = ({ id }: GridRenderCellParams) => {
    return (
      <IconButton
          aria-label="delete"
          style={{ marginLeft: 16, color: '#3f51b5' }}
          onClick={() => {
            setSelectedUserId(String(id))
            setOpenModalDeleteUser(true)
          }}
      >
        <DeleteIcon />
      </IconButton>
    )
  }

  const renderProfilePicture = ({ row: users }: GridRenderCellParams) => {
    return (
      <div>
        {users.imageUrl ? <Avatar className={classes.profileImage} src={users.imageUrl} /> : <Avatar className={classes.profileImage} src={userDefault} /> }
      </div>
    )
  }

  useEffect(() => {
    listAllUsers()
  }, [listAllUsers])

  useEffect(() => {
    if (!user.isAdmin) navigate('/home')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 300 },
    {
      field: 'imageUrl',
      headerName: 'Foto do perfil',
      width: 200,
      editable: false,
      renderCell: renderProfilePicture
    },
    {
      field: 'name',
      headerName: 'Nome Completo',
      width: 300,
      editable: false
    },
    {
      field: 'email',
      headerName: 'E-mail',
      width: 300,
      editable: false
    },
    {
      field: 'admin',
      headerName: 'Admin',
      width: 120,
      editable: false
    },
    {
      field: 'Excluir',
      headerName: 'Excluir',
      width: 120,
      renderCell: deleteUserButton
    }
  ]

  return (
    <>
      <Paper style={{ height: 550, width: '100%' }}>
         <DataGrid
          rows={users}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick/>
      </Paper>
      {openModalDeleteUser && (<Modal
        open={openModalDeleteUser}
        closeAction={handleCloseModalDeleteUser}
        title={'Exclusão de Usuário'}
        description={'Tem certeza que deseja excluir esse usuário? Esta ação é irreversível e irá excluir todas as publicações, curtidas e imagens.'}
        confirmAction={onClickDeleteUserAction}
        loading={deleteUserLoading}
      />)}
    </>
  )
}

export default UserDataGrid
