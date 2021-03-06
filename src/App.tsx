import React, {
  FunctionComponent,
  StrictMode,
  useEffect,
  useState,
  Suspense,
  lazy,
} from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NotFound from './components/notFound/NotFound'
import { db, firebaseI } from './config/firebase'
import './config/firebase'
import Loading from './components/loading/Loading'
import ConfirmedListPage from './views/ConfimedListPage/ConfirmedListPage'

export const DBContext = React.createContext(db)

const HomePage = lazy(() => import('./views/HomePage/HomePage'))
const ConfirmPage = lazy(() => import('./views/ConfirmationPage/ConfirmPage'))
const MessagePage = lazy(() => import('./views/MessagePage/MessagePage'))

const App: FunctionComponent = () => {
  const [loading, setLoading] = useState(true)
  const singIn = async () => {
    await firebaseI
      .auth()
      .signInWithEmailAndPassword(
        process.env.FIREBASE_EMAIL || '',
        process.env.FIREBASE_PASS || ''
      )
    setLoading(false)
  }
  useEffect(() => {
    singIn()
  }, [])

  return (
    <div className="app">
      {loading ? (
        <Loading />
      ) : (
        <DBContext.Provider value={db}>
          <Suspense fallback={<Loading />}>
            <Router>
              <Switch>
                <Route exact path="/">
                  <HomePage />
                </Route>
                <Route path="/confirm">
                  <ConfirmPage />
                </Route>
                <Route path="/message">
                  <MessagePage />
                </Route>
                <Route exact path="/confirmed-list/AVJxOYvgfva">
                  <ConfirmedListPage />
                </Route>
                <Route>
                  <NotFound />
                </Route>
              </Switch>
            </Router>
          </Suspense>
        </DBContext.Provider>
      )}
    </div>
  )
}

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
)
