export enum PreferencesTypes {
  INIT_PREFERENCES = '@preferences/INIT_PREFERENCES',
  TOGGLE_DARK_MODE = '@preferences/TOGGLE_DARK_MODE',
}

export interface IPreferencesState {
  darkMode: boolean
}

export interface IInitPreferencesAction {
  type: typeof PreferencesTypes.INIT_PREFERENCES
  payload: Partial<IPreferencesState>
}

export interface IToggleDarkModeAction {
  type: typeof PreferencesTypes.TOGGLE_DARK_MODE
}

export type IPreferencesActions =
  | IToggleDarkModeAction
  | IInitPreferencesAction
