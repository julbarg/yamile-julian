import React, { FunctionComponent } from 'react'
import { IPersonResult } from '../../../types/Types'
import PersonResult from './personResult/PersonResult'

const PersonResults: FunctionComponent<{
  people: IPersonResult[]
  // eslint-disable-next-line no-unused-vars
  onClick: (idFamily: string) => void
}> = ({ people, onClick }) => {
  return (
    <>
      <div className="step">
        <div className="box number">2.</div>
        <div className="box title">Selecciona tu nombre</div>
        <div className="box task">
          <div>
            Selecciona tu nombre de la lista dando clic al boton{' '}
            <strong>Seleccionar</strong> al lado del nombre que te corresponda
          </div>

          <ul>
            {people.map((person) => (
              <li key={person.id}>
                <PersonResult person={person} onClick={onClick} />
              </li>
            ))}
            {people.length == 0 ? (
              <h3>No se encontraron conincidencias. Intenta de nuevo</h3>
            ) : null}
          </ul>
        </div>
      </div>
    </>
  )
}

export default PersonResults
