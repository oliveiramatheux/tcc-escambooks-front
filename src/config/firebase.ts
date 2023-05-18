/* eslint-disable import/no-duplicates */
import config from './index'
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage, ref, deleteObject as deleteFile, uploadBytes, getDownloadURL } from 'firebase/storage'

const firebaseConfig = {
  apiKey: `${config.firebaseConfigApiKey}`,
  authDomain: `${config.firebaseConfigAuthDomain}`,
  databaseURL: `${config.firebaseConfigDatabaseUrl}`,
  projectId: `${config.firebaseConfigProjectId}`,
  storageBucket: `${config.firebaseConfigStorageBucket}`,
  messagingSenderId: `${config.firebaseConfigMessagingSenderId}`,
  appId: `${config.firebaseConfigAppId}`,
  measurementId: `${config.firebaseConfigMeasurementId}`
}

const app = initializeApp(firebaseConfig)

const firebaseDatabase = getDatabase(app)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const firestore = getFirestore(app)
const storage = getStorage(app)

const getStorageRef = (refUrl: string) => ref(storage, refUrl)

export {
  firebaseDatabase,
  auth,
  googleProvider,
  firestore,
  storage,
  signInWithPopup,
  getStorageRef,
  deleteFile,
  uploadBytes,
  getDownloadURL
}
