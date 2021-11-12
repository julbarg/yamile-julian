import React, {
  FunctionComponent,
  StrictMode,
  Suspense,
  lazy,
} from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import NotFound from './components/notFound/NotFound'
import { db } from './config/firebase'
import './config/firebase'
import Loading from './components/loading/Loading'
import ConfirmedListPage from './views/ConfimedListPage/ConfirmedListPage'
import { AuthProvider, useAuth } from './context/AuthContext'

export const DBContext = React.createContext(db)

const HomePage = lazy(() => import('./views/HomePage/HomePage'))
const ConfirmPage = lazy(() => import('./views/ConfirmationPage/ConfirmPage'))
const MessagePage = lazy(() => import('./views/MessagePage/MessagePage'))

const App: FunctionComponent = () => {
  const { loading: authLoading } = useAuth();

  return (
    <div className="app">
      {authLoading ? (
        <Loading />
      ) : (
        <AuthProvider>
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
        </AuthProvider>
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
