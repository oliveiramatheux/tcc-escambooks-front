import { createStore, Store, applyMiddleware } from 'redux'
import rootReducer, { ApplicationState } from './rootReducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'

const saveToLocalStorage = (state: ApplicationState) => {
  localStorage.setItem('state', JSON.stringify(state))
}

const loadFromLocalStorage = () => {
  const serializedState = localStorage.getItem('state')
  return serializedState ? JSON.parse(serializedState) : undefined
}

const sagaMiddleware = createSagaMiddleware()
const persistedStore = loadFromLocalStorage()

const store: Store<ApplicationState> = createStore(rootReducer, persistedStore, applyMiddleware(sagaMiddleware))

store.subscribe(() => {
  saveToLocalStorage(store.getState())
})

sagaMiddleware.run(rootSaga)

// const sagaMiddleware = createSagaMiddleware()
// const store: Store<ApplicationState> = createStore(rootReducer, applyMiddleware(sagaMiddleware))
// sagaMiddleware.run(rootSaga)

export default store
