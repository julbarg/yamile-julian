import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import './NotFound.scss'

const NotFound: FunctionComponent = () => {
  return (
    <div className="not-found">
      <div className="not-found-container">
        <div className="number">404</div>
        <div className="page">Pagina No Encontrada</div>
        <div className="description">
          Lo sentimos, la pagina que estas buscando no se encuentra disponible
        </div>
        <div className="button-container">
          <Link className="button" to="/">
            <span>Sacame de Aqui</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
