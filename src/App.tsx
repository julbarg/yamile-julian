import React, { FunctionComponent, StrictMode } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NotFound from './components/notFound/NotFound'
import { db } from './config/firebase'
import './config/firebase'
import ConfirmPage from './views/ConfirmationPage/ConfirmPage'
import HomePage from './views/HomePage/HomePage'

export const DBContext = React.createContext(db)

const App: FunctionComponent = () => {
  return (
    <div className="app">
      <DBContext.Provider value={db}>
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
      </DBContext.Provider>
    </div>
  )
}

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
)
