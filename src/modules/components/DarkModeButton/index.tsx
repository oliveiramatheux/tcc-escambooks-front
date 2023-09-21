import { IconButton, Tooltip } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDarkMode } from '../../../store/preferences/actions'
import LightModeIcon from '@material-ui/icons/BrightnessHigh'
import DarkModeIcon from '@material-ui/icons/Brightness3'
import { ApplicationState } from '../../../store/rootReducer'
import { useCallback } from 'react'

const DarkModeButton = () => {
  const { darkMode } = useSelector(
    (state: ApplicationState) => state.preferences
  )
  const dispatch = useDispatch()
  const onClick = useCallback(() => dispatch(toggleDarkMode()), [dispatch])

  return (
    <Tooltip title="Alternar modo escuro">
      <IconButton aria-label="toggle dark mode" color="inherit"
        onClick={onClick}>
          {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  )
}

export default DarkModeButton
