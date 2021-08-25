import React, { FunctionComponent } from 'react'
import ReactLoading from 'react-loading'
import './Loader.scss'

const Loader: FunctionComponent = () => {
  return (
    <div className="loader">
      <div className="loader-container">
        <h1>Yamile & Julian</h1>
        <div className="loader-title">Cargando...</div>
        <ReactLoading
          className="loading-bars"
          type="bars"
          color="#3f4551"
          width={72}
        />
      </div>
    </div>
  )
}

export default Loader
