import React, { FunctionComponent, StrictMode, lazy, Suspense } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loader from './components/loader/Loader'
import NotFound from './components/notFound/NotFound'
import ConfirmPage from './views/ConfirmationPage/ConfirmPage'

const HomePage = lazy(() => import('./views/HomePage/HomePage'))

const App: FunctionComponent = () => {
  return (
    <div className="app">
      <Suspense fallback={<Loader />}>
        <Router>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/confirm">
              <ConfirmPage />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </Suspense>
    </div>
  )
}

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
)
