import { IPreferencesActions, IPreferencesState, PreferencesTypes } from './types'

const initialState: IPreferencesState = {
  darkMode: false
}

export default function preferencesReducer (
  state = initialState,
  action: IPreferencesActions
): IPreferencesState {
  switch (action.type) {
    case PreferencesTypes.TOGGLE_DARK_MODE:
      return {
        ...state,
        darkMode: !state.darkMode
      }

    case PreferencesTypes.INIT_PREFERENCES:
      return { ...state, ...action.payload }

    default:
      return state
  }
}
