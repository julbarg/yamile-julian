import React from 'react'
import './Confirm.scss'

const Confirm = () => {
  return (
    <div className="confirm">
      <h2>Confirmar Asistencia</h2>
      <div className="confirm-container">
        <div className="step">
          <div className="box number">1.</div>
          <div className="box title">Busca tu nombre</div>
          <div className="box task">
            <div>
              Busca tu nombre usando el campo de texto y luego da clic en el
              boton <strong>Buscar</strong>
            </div>

            <div className="actions">
              <input className="box-shadow" type="text" />
              <button className="box-shadow">Buscar</button>
            </div>
          </div>
        </div>
        <div className="step">
          <div className="box number">2.</div>
          <div className="box title">Selecciona tu nombre</div>
          <div className="box task">
            <div>
              Selecciona tu nombre de la lista dando clic al boton{' '}
              <strong>Seleccionar</strong> al lado del nombre que te corresponda
            </div>

            <ul>
              <li>
                <div className="results box-shadow">
                  <div>Julian Barragan Verano</div>
                  <button>Seleccionar</button>
                </div>
              </li>
              <li>
                <div className="results box-shadow">
                  <div>Julian Castro Mayorga</div>
                  <button>Seleccionar</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="step">
          <div className="box number">3.</div>
          <div className="box title">Confirma Asistencia</div>
          <div className="box task">
            <div>
              Selecciona las personas de tu nucleo familiar que van a asisitir y
              da clic en el boton <strong>Confirmar</strong>
            </div>
            <ul>
              <li>
                <div className="people box-shadow">
                  <input
                    type="checkbox"
                    id="julian"
                    name="julian"
                    value="julian"
                  />
                  <label htmlFor="julian">Julian Barragan Verano</label>
                </div>
                <div className="secondary box-shadow">
                  Hospedaje:
                  <input
                    type="radio"
                    id="accommodation"
                    name="yes"
                    value="yes"
                  />
                  <label htmlFor="yes">Si</label>
                  <input type="radio" id="accommodation" name="no" value="no" />
                  <label htmlFor="no">No</label>
                </div>
              </li>
              <li>
                <div className="people box-shadow">
                  <input
                    type="checkbox"
                    id="sandra"
                    name="sandra"
                    value="sandra"
                  />
                  <label htmlFor="sandra">Sandra Barragan Verano</label>
                </div>
              </li>
              <li>
                <div className="people box-shadow">
                  <input
                    type="checkbox"
                    id="alicia"
                    name="alicia"
                    value="alicia"
                  />
                  <label htmlFor="sandra">Alicia Verano</label>
                </div>
              </li>
              <li>
                <div className="people box-shadow">
                  <input
                    type="checkbox"
                    id="aristobulo"
                    name="aristobulo"
                    value="aristobulo"
                  />
                  <label htmlFor="sandra">Aristobulo Barragan</label>
                </div>
              </li>
            </ul>
            <button className="button-confirm box-shadow">Confirmar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirm
