export enum PreferencesTypes {
  TOGGLE_DARK_MODE = '@preferences/TOGGLE_DARK_MODE',
}

export interface IPreferencesState {
  darkMode: boolean
}

export interface IToggleDarkModeAction {
  type: typeof PreferencesTypes.TOGGLE_DARK_MODE
}

export type IPreferencesActions =
    | IToggleDarkModeAction
