import React, { FunctionComponent } from 'react'
import { IPersonResult } from '../../../../types/Types'

const PersonResult: FunctionComponent<{
  person: IPersonResult
  // eslint-disable-next-line no-unused-vars
  onClick: (id: string) => void
}> = ({ person, onClick }) => {
  return (
    <div className="results box-shadow">
      <div>{person.name}</div>
      <button onClick={() => onClick(person.idFamily)}>Seleccionar</button>
    </div>
  )
}

export default PersonResult
