import React, { FunctionComponent, StrictMode } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ConfirmPage from './views/ConfirmationPage/ConfirmPage'
import HomePage from './views/HomePage/HomePage'

const App: FunctionComponent = () => {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/confirm">
            <ConfirmPage />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
)
