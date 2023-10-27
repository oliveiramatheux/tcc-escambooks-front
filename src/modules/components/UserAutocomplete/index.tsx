import Box from '@mui/material/Box'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import UserAutocompleteLabel from '../UserAutocompleteLabel'
import { useCallback, useState } from 'react'
import { User, getUsersByName } from '../../../routes/services/user'
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
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState<string>('')

  const listUsersByName = useCallback(async (name: string) => {
    setIsLoading(true)
    const userDataByName = await getUsersByName(name)
    setOptions(userDataByName)
    setIsLoading(false)
  }, [])

  const handleInputChange = async (_event: React.SyntheticEvent<Element, Event>, searchValue: string) => {
    setSearch(searchValue)

    if (searchValue) {
      listUsersByName(searchValue)
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
      options={options}
      PaperComponent={(props) => (
        <Paper {...props} className={darkMode ? classes.darkThemeStyles : classes.lightThemeStyles} />
      )}
      noOptionsText={search ? 'Leitor não encontrado...' : 'Digite o nome do leitor...'}
      autoHighlight
      getOptionLabel={(option) => option.name}
      inputValue={search}
      popupIcon={isLoading ? <CircularProgress size={28} className={classes.loadingIcon}/> : undefined}
      onInputChange={handleInputChange}
      renderOption={(props, option: User) => (
        <div className={classes.divRedirect} onClick={() => { handleClickUser(option.id) }}>
          <Box component="span" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            <Avatar className={classes.profileImage} src={option.imageUrl || userDefault} />
            <span className={classes.usernameSpan}>
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
            label={<UserAutocompleteLabel/>}
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
