import dotenv from 'dotenv'
dotenv.config()

const {
  REACT_APP_APP_PORT,
  REACT_APP_FIREBASE_CONFIG_API_KEY,
  REACT_APP_FIREBASE_CONFIG_AUTH_DOMAIN,
  REACT_APP_FIREBASE_CONFIG_DATABASE_URL,
  REACT_APP_FIREBASE_CONFIG_PROJECT_ID,
  REACT_APP_FIREBASE_CONFIG_STORAGE_BUCKET,
  REACT_APP_FIREBASE_CONFIG_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_CONFIG_APP_ID,
  REACT_APP_FIREBASE_CONFIG_MEASUREMENT_ID,
  REACT_APP_SERVICE_URL
} = process.env

export default {
  applicationPort: REACT_APP_APP_PORT,
  firebaseConfigApiKey: REACT_APP_FIREBASE_CONFIG_API_KEY,
  firebaseConfigAuthDomain: REACT_APP_FIREBASE_CONFIG_AUTH_DOMAIN,
  firebaseConfigDatabaseUrl: REACT_APP_FIREBASE_CONFIG_DATABASE_URL,
  firebaseConfigProjectId: REACT_APP_FIREBASE_CONFIG_PROJECT_ID,
  firebaseConfigStorageBucket: REACT_APP_FIREBASE_CONFIG_STORAGE_BUCKET,
  firebaseConfigMessagingSenderId: REACT_APP_FIREBASE_CONFIG_MESSAGING_SENDER_ID,
  firebaseConfigAppId: REACT_APP_FIREBASE_CONFIG_APP_ID,
  firebaseConfigMeasurementId: REACT_APP_FIREBASE_CONFIG_MEASUREMENT_ID,
  serviceUrl: REACT_APP_SERVICE_URL
}
