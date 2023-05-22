import { setUserId, setUserProperties } from 'firebase/analytics'
import { analytics, logEvent } from '../../config/firebase'
import { IUserState } from 'store/users/types'

export const handleEventScreen = (screenName: string, screenClass: string) => {
  logEvent(analytics, 'screen_view', {
    firebase_screen: screenName,
    firebase_screen_class: screenClass
  })
}

export const handleEventUserInfos = (user: IUserState) => {
  setUserId(analytics, user.id)
  setUserProperties(analytics, { email: user.email, name: user.name })
}
