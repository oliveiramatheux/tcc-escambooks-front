import { IPreferencesActions, PreferencesTypes } from './types'

export const toggleDarkMode = (): IPreferencesActions => ({
  type: PreferencesTypes.TOGGLE_DARK_MODE
})
