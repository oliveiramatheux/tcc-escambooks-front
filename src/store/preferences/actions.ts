import { IPreferencesActions, IPreferencesState, PreferencesTypes } from './types'

export const initPreferences = (payload: Partial<IPreferencesState>): IPreferencesActions => ({
  type: PreferencesTypes.INIT_PREFERENCES,
  payload
})

export const toggleDarkMode = (): IPreferencesActions => ({
  type: PreferencesTypes.TOGGLE_DARK_MODE
})
