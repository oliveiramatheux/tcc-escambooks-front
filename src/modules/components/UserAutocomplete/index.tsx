import Box from '@mui/material/Box'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import useStyles from './styles'
import { StylesProvider } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

const UserAutocomplete = (): JSX.Element => {
  const classes = useStyles()

  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 300, height: 40 }}
      options={countries}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="20"
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            alt=""
          />
          {option.label} ({option.code}) +{option.phone}
        </Box>
      )}
      renderInput={(params) => (
        // const { InputLabelProps, inputProps, ...rest } = params
        // return (
        // <InputBase
        //   classes={{
        //     root: classes.inputRoot,
        //     input: classes.inputInput
        //   }}
        //   placeholder="Nome do país"
        //   {...params.InputProps} {...rest} />
        <StylesProvider injectFirst>
          <TextField
              {...params}
              id="filled-basic"
              variant="filled"
              InputLabelProps={{
                shrink: true,
                style: { transform: 'translate(0, 50%)', color: '#757575' }
              }}
              placeholder='Encontre um país...'
              sx={{
                height: 50,
                padding: '1 1 1 0',
                color: 'gray',
                '& input': {
                  height: 7,
                  color: '#fff',
                  padding: '1 1 1 0'
                }
              }}
              inputProps={{
                ...params.inputProps
              }}
            />
        </StylesProvider>
      )}
    />
  )
}

interface CountryType {
  code: string
  label: string
  phone: string
  suggested?: boolean
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries: readonly CountryType[] = [
  { code: 'AI', label: 'Anguilla', phone: '1-264' },
  { code: 'AL', label: 'Albania', phone: '355' },
  { code: 'AM', label: 'Armenia', phone: '374' },
  { code: 'AO', label: 'Angola', phone: '244' },
  { code: 'AQ', label: 'Antarctica', phone: '672' },
  { code: 'AR', label: 'Argentina', phone: '54' },
  { code: 'AS', label: 'American Samoa', phone: '1-684' },
  { code: 'AT', label: 'Austria', phone: '43' },
  { code: 'JP', label: 'Japan', phone: '81', suggested: true }
]

export default UserAutocomplete
