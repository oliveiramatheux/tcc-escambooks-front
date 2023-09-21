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
      console.log(state, action)
      return {
        ...state,
        darkMode: !state.darkMode
      }

    default:
      return state
  }
}
