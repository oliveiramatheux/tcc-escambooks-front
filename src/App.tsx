import './App.css'
import AppRoutes from './routes'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import store from './store'

const App = (): JSX.Element => {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </HelmetProvider>
  )
}

export default App
