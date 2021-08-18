import { FunctionComponent, StrictMode } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from './views/HomePage/HomePage'

const App: FunctionComponent = () => {
  return (
    <div className="app">
      <Router>
        <Route path="/">
          <HomePage />
        </Route>
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
