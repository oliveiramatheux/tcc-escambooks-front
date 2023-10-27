import SearchIcon from '@material-ui/icons/Search'

const UserAutocompleteLabel = (): JSX.Element => {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <SearchIcon/>
      <span>Nome do Leitor...</span>
    </div>
  )
}

export default UserAutocompleteLabel
