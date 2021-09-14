import React, { FunctionComponent } from 'react'
import ReactLoading from 'react-loading'
import './Loading.scss'

const Loading: FunctionComponent<{ color?: string }> = ({
  color = '#3f4551',
}) => {
  return (
    <div className="loading">
      <div className="loading-title" style={{ color }}>
        Cargando...
      </div>
      <div className="loading-subtitle" style={{ color }}>
        Esto puede tomar un tiempo, por favor espera un poco
      </div>

      <ReactLoading type="bars" color={color} width={72} />
    </div>
  )
}

export default Loading
