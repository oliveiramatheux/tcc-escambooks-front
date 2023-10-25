import Box from '@mui/material/Box'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import CustomLabel from '../CustomLabel'
import { useCallback, useEffect, useState } from 'react'
import { User, getAllUsers, getUsersByNameService } from '../../../routes/services/user'
import { Avatar, CircularProgress, Paper } from '@material-ui/core'
import userDefault from '../../../images/user-default.png'
import { useNavigate } from 'react-router-dom'
import { ApplicationState } from 'store/rootReducer'
import { useSelector } from 'react-redux'
import useStyles from './styles'

const UserAutocomplete = (): JSX.Element => {
  const classes = useStyles()
  const navigate = useNavigate()

  const { darkMode } = useSelector(
    (state: ApplicationState) => state.preferences
  )

  const handleClickUser = (id: string) => {
    navigate(`/profile/${id}`)
  }

  const [options, setOptions] = useState<User[]>([])
  const [filteredOptions, setFilteredOptions] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState<string>('')

  const listAllUsers = useCallback(async () => {
    setIsLoading(true)
    const userData = await getAllUsers()
    setOptions(userData)
    setIsLoading(false)
  }, [])

  const listUsersByName = useCallback(async (name: string) => {
    setIsLoading(true)
    const userDataByName = await getUsersByNameService(name)
    setFilteredOptions(userDataByName)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    listAllUsers()
  }, [listAllUsers])

  const handleInputChange = async (_: React.ChangeEvent<unknown>, searchValue: string) => {
    setSearch(searchValue)

    if (searchValue) {
      listUsersByName(searchValue)
    } else {
      setFilteredOptions([])
    }
  }

  return (
    <Autocomplete
      id="search-user"
      sx={{
        width: 300,
        '& .MuiAutocomplete-input': {
          color: 'white'
        }
      }}
      options={filteredOptions.length > 0 ? filteredOptions : options}
      PaperComponent={(props) => (
        <Paper {...props} className={darkMode ? classes.darkThemeStyles : classes.lightThemeStyles} />
      )}
      noOptionsText={'Leitor não encontrado...'}
      autoHighlight
      getOptionLabel={(option) => option.name}
      inputValue={search}
      popupIcon={isLoading ? <CircularProgress size={28} className={classes.loadingIcon}/> : undefined}
      onInputChange={handleInputChange}
      renderOption={(props, option: User) => (
        <div className={classes.divRedirect} onClick={() => { handleClickUser(option.id) }}>
          <Box onClick={() => { handleClickUser(option.id) }} component="span" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            {option.imageUrl
              ? <Avatar className={classes.profileImage} src={option.imageUrl} />
              : <Avatar className={classes.profileImage} src={userDefault} /> }
            <span className={classes.usernameSpan} onClick={() => { handleClickUser(option.id) }}>
            {option.name}
            </span>
          </Box>
        </div>
      )}
      renderInput={(params) => (
        <TextField
            {...params}
            id="filled-basic"
            variant="filled"
            label={<CustomLabel/>}
            fullWidth
            className={classes.userSearchBackground}
            inputProps={{
              ...params.inputProps
            }}
            InputLabelProps={{
              style: { color: 'lightgray' }
            }}
          />
      )}
    />
  )
}

export default UserAutocomplete
